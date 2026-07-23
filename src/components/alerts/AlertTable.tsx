import React from 'react';
import type { Alert } from '../../types/alert';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { EmptyState } from '../common/EmptyState';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { Camera, AlertTriangle } from 'lucide-react';
import { formatDuration, formatDateTime } from '../../utils/format';

interface AlertTableProps {
  alerts: Alert[];
  isLoading: boolean;
  onViewSnapshot: (alertId: number) => void;
}

export const AlertTable: React.FC<AlertTableProps> = ({ alerts, isLoading, onViewSnapshot }) => {
  if (isLoading && alerts.length === 0) {
    return (
      <div className="w-full flex justify-center items-center p-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div className="p-8">
        <EmptyState 
          icon={<AlertTriangle size={48} className="text-cusgrey mx-auto mb-4" />}
          title="No Alerts Found"
          description="There are no loitering incidents to display."
        />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-cuslightgrey text-cuslightblack text-capt uppercase tracking-wider">
            <th className="py-4 px-6 font-medium">Timestamp</th>
            <th className="py-4 px-6 font-medium">Track ID</th>
            <th className="py-4 px-6 font-medium">Zone ID</th>
            <th className="py-4 px-6 font-medium">Duration</th>
            <th className="py-4 px-6 font-medium">Status</th>
            <th className="py-4 px-6 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-cuslightgrey">
          {alerts.map((alert) => (
            <tr key={alert.id} className="hover:bg-cuslightgrey/30 transition-colors duration-150">
              <td className="py-4 px-6 text-bs text-cusblack whitespace-nowrap">
                {formatDateTime(alert.timestamp)}
              </td>
              <td className="py-4 px-6 text-bs text-cusblack">
                <Badge variant="default" className="bg-cuslightgrey/20 text-cusblack">
                  #{alert.track_id}
                </Badge>
              </td>
              <td className="py-4 px-6 text-bs text-cusblack">
                {alert.zone_id ? (
                  <Badge variant="info">
                    Zone {alert.zone_id}
                  </Badge>
                ) : (
                  <span className="text-cusgrey italic">Global</span>
                )}
              </td>
              <td className="py-4 px-6 text-bs text-cusblack font-medium text-danger">
                {formatDuration(alert.duration)}
              </td>
              <td className="py-4 px-6 text-bs">
                {alert.is_resolved ? (
                  <Badge variant="success" shape="pill">
                    Resolved
                  </Badge>
                ) : (
                  <Badge variant="danger" shape="pill">
                    Active
                  </Badge>
                )}
              </td>
              <td className="py-4 px-6 text-right">
                <Button
                  onClick={() => onViewSnapshot(alert.id)}
                  disabled={!alert.snapshot_path}
                  variant={alert.snapshot_path ? 'primary' : 'ghost'}
                  size="sm"
                  className={!alert.snapshot_path ? 'bg-cuslightgrey text-cusdarkgrey cursor-not-allowed opacity-60' : 'bg-information hover:bg-information/90'}
                  leftIcon={<Camera size={16} />}
                >
                  Snapshot
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
