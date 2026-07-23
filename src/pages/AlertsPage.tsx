import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { AlertTable } from '../components/alerts/AlertTable';
import { AlertSnapshotModal } from '../components/alerts/AlertSnapshotModal';
import { AlertPagination } from '../components/alerts/AlertPagination';
import { Card } from '../components/common/Card';
import { getAlerts } from '../api/alertsApi';
import type { Alert } from '../types/alert';

export const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  
  // Modal State
  const [selectedAlertId, setSelectedAlertId] = useState<number | null>(null);

  const fetchAlerts = async (showLoading = true) => {
    if (showLoading) setIsLoading(true);
    try {
      const offset = (page - 1) * limit;
      const data = await getAlerts(limit, offset);
      setAlerts(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to fetch alerts');
      console.error(error);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  };

  // Initial fetch and dependency on page/limit change
  useEffect(() => {
    fetchAlerts(true);
  }, [page, limit]);

  // Auto-polling every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Fetch without triggering full loading spinner
      fetchAlerts(false);
    }, 10000);
    return () => clearInterval(interval);
  }, [page, limit]);

  return (
    <div className="h-full flex flex-col">
      <Card padding={false} className="flex-1 overflow-hidden">
        {/* Main Content Area: Table */}
        <div className="flex-1 overflow-auto">
          <AlertTable 
            alerts={alerts}
            isLoading={isLoading}
            onViewSnapshot={setSelectedAlertId}
          />
        </div>

        {/* Footer Area: Pagination */}
        <AlertPagination 
          page={page}
          limit={limit}
          totalFetched={alerts.length}
          onPageChange={setPage}
          onLimitChange={(newLimit) => {
            setLimit(newLimit);
            setPage(1); // Reset to first page when limit changes
          }}
        />
      </Card>

      <AlertSnapshotModal 
        isOpen={selectedAlertId !== null}
        alertId={selectedAlertId}
        onClose={() => setSelectedAlertId(null)}
      />
    </div>
  );
};
