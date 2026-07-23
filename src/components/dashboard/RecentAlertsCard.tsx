import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, Map } from 'lucide-react';
import { getAlerts, getAlertSnapshotUrl } from '../../api/alertsApi';
import type { Alert } from '../../types/alert';
import { Badge } from '../common/Badge';
import { Card, CardHeader } from '../common/Card';
import { EmptyState } from '../common/EmptyState';
import { Skeleton } from '../common/LoadingSpinner';

export const RecentAlertsCard: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await getAlerts(5);
        setAlerts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch alerts', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader 
        title="Recent Alerts"
        icon={<AlertTriangle size={20} />}
        action={
          <Badge variant="default" className="text-cusdarkgrey px-2 py-0.5 font-medium tracking-normal normal-case border-cuslightgrey">
            <span className="w-1.5 h-1.5 rounded-full bg-cusdarkgrey animate-pulse mr-1"></span>
            Live
          </Badge>
        }
      />

      <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-3">
        {isLoading && alerts.length === 0 ? (
          <Skeleton variant="card" count={3} />
        ) : !isLoading && alerts.length === 0 ? (
          <EmptyState 
            icon={<AlertTriangle size={32} />}
            title="No recent alerts"
            description="System is monitoring all zones"
          />
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className="flex gap-3 items-center p-3 border border-cuslightgrey bg-cuswhite rounded-xl hover:border-cusdarkgrey/30 transition-colors group">
              <div className="w-12 h-12 flex-shrink-0 bg-white rounded-lg border border-cuslightgrey overflow-hidden flex items-center justify-center text-cusdarkgrey">
                {alert.snapshot_path ? (
                  <img src={getAlertSnapshotUrl(alert.id)} alt={`Alert ${alert.id}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                ) : (
                  <AlertTriangle size={16} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="text-text-bs font-semibold text-cusblack truncate">
                    Zone {alert.zone_id || 'Unknown'}
                  </p>
                  <span className="text-text-capt text-cusdarkgrey font-medium whitespace-nowrap ml-2">
                    {alert.timestamp ? new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '--:--:--'}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-text-capt text-cusdarkgrey">
                  <span className="flex items-center gap-1 bg-white px-1.5 py-0.5 rounded border border-cuslightgrey">
                    <Clock size={10} />
                    {(alert.duration ?? 0).toFixed(1)}s
                  </span>
                  <span className="flex items-center gap-1 bg-white px-1.5 py-0.5 rounded border border-cuslightgrey">
                    <Map size={10} />
                    Track #{alert.track_id}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
