import React from 'react';
import { Button } from '../common/Button';

interface AlertPaginationProps {
  page: number;
  limit: number;
  totalFetched: number;
  onPageChange: (newPage: number) => void;
  onLimitChange: (newLimit: number) => void;
}

export const AlertPagination: React.FC<AlertPaginationProps> = ({
  page,
  limit,
  totalFetched,
  onPageChange,
  onLimitChange
}) => {
  const hasNextPage = totalFetched === limit;
  const startIdx = (page - 1) * limit + 1;
  const endIdx = startIdx + totalFetched - 1;

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-cuslightgrey bg-white">
      <div className="flex items-center text-sm text-cuslightblack">
        {totalFetched > 0 ? (
          <span>
            Showing <span className="font-medium text-cusblack">{startIdx}</span> to{' '}
            <span className="font-medium text-cusblack">{endIdx}</span> items
          </span>
        ) : (
          <span>No items to show</span>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="limit" className="text-sm text-cuslightblack">Rows per page:</label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="text-sm border-cuslightgrey rounded-md shadow-sm focus:ring-cusblue focus:border-cusblue"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            variant={page === 1 ? 'ghost' : 'secondary'}
            size="sm"
          >
            Previous
          </Button>
          <Button
            onClick={() => onPageChange(page + 1)}
            disabled={!hasNextPage}
            variant={!hasNextPage ? 'ghost' : 'secondary'}
            size="sm"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
