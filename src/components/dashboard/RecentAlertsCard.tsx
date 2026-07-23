import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, Map } from 'lucide-react';
import { getAlerts, getAlertSnapshotUrl } from '../../api/alertsApi';
import type { Alert } from '../../types/alert';

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
    <div className="bg-white rounded-2xl shadow-sm border border-cuslightgrey p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-text-bd font-semibold text-cusblack flex items-center gap-2">
          <AlertTriangle size={20} className="text-cusblack" />
          Recent Alerts
        </h3>
        <span className="text-text-capt text-cusdarkgrey bg-cuslightgrey border border-cuslightgrey px-2 py-0.5 rounded-md flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cusdarkgrey animate-pulse"></span>
          Live
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-3">
        {isLoading && alerts.length === 0 ? (
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 items-center p-3 border border-cuslightgrey rounded-xl">
                <div className="w-12 h-12 bg-cuslightgrey/50 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-cuslightgrey/50 rounded w-3/4"></div>
                  <div className="h-3 bg-cuslightgrey/50 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : !Array.isArray(alerts) || alerts.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-cusdarkgrey py-8">
            <AlertTriangle size={32} className="mb-2 opacity-50" />
            <p className="text-text-bs font-medium">No recent alerts</p>
          </div>
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
    </div>
  );
};
