import React, { useState, useEffect } from 'react';
import { Activity, Server, Target } from 'lucide-react';
import { getStatus } from '../../api/statusApi';
import type { StatusResponse } from '../../types/status';
import { Badge } from '../common/Badge';
import { Card, CardHeader } from '../common/Card';
import { Skeleton } from '../common/LoadingSpinner';

export const SystemStatusCard: React.FC = () => {
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await getStatus();
        setStatus(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch status');
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader 
        title="System Status" 
        icon={<Activity size={20} />} 
        action={
          status?.pipeline_status === 'Active' ? (
            <Badge variant="default" shape="pill">
              Active
            </Badge>
          ) : (
            <Badge variant="default" shape="pill" className="text-cusdarkgrey">
              Inactive
            </Badge>
          )
        }
      />

      {error && !status ? (
        <div className="flex-1 flex items-center justify-center text-cusdarkgrey text-text-bs">
          {error}
        </div>
      ) : !status ? (
        <div className="flex-1 flex flex-col justify-center space-y-4 p-4">
          <Skeleton height="h-[60px]" />
          <Skeleton height="h-[60px]" />
        </div>
      ) : (
        <div className="space-y-4 flex-1">
          <div className="p-4 rounded-xl border border-cuslightgrey bg-cuswhite flex items-center justify-between transition-colors hover:border-cusdarkgrey/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white border border-cuslightgrey rounded-lg shadow-sm">
                <Server size={18} className="text-cusdarkgrey" />
              </div>
              <div>
                <p className="text-text-capt text-cusdarkgrey uppercase tracking-wider font-medium">Processing FPS</p>
                <p className="text-text-h6 font-bold text-cusblack leading-tight mt-0.5">{(status.pipeline_fps ?? 0).toFixed(1)} <span className="text-text-capt text-cusgrey font-normal normal-case">fps</span></p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-cuslightgrey bg-cuswhite flex items-center justify-between transition-colors hover:border-cusdarkgrey/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white border border-cuslightgrey rounded-lg shadow-sm">
                <Target size={18} className="text-cusdarkgrey" />
              </div>
              <div>
                <p className="text-text-capt text-cusdarkgrey uppercase tracking-wider font-medium">Active Zones</p>
                <p className="text-text-h6 font-bold text-cusblack leading-tight mt-0.5">{status.active_zones_count ?? 0}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
