import React, { useState, useEffect } from 'react';
import { Activity, Server, Target } from 'lucide-react';
import { getStatus } from '../../api/statusApi';
import type { StatusResponse } from '../../types/status';

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
    <div className="bg-white rounded-2xl shadow-sm border border-cuslightgrey p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-text-bd font-semibold text-cusblack flex items-center gap-2">
          <Activity size={20} className="text-cusblack" />
          System Status
        </h3>
        {status?.pipeline_status === 'Active' ? (
          <span className="px-3 py-1 bg-cuslightgrey border border-cusdarkgrey/20 rounded-full text-text-capt font-semibold text-cusblack uppercase tracking-wider">
            Active
          </span>
        ) : (
          <span className="px-3 py-1 bg-cuslightgrey border border-cusdarkgrey/20 rounded-full text-text-capt font-semibold text-cusdarkgrey uppercase tracking-wider">
            Inactive
          </span>
        )}
      </div>

      {error && !status ? (
        <div className="flex-1 flex items-center justify-center text-cusdarkgrey text-text-bs">
          {error}
        </div>
      ) : !status ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse w-full space-y-4">
            <div className="h-14 bg-cuslightgrey/50 rounded-xl w-full"></div>
            <div className="h-14 bg-cuslightgrey/50 rounded-xl w-full"></div>
          </div>
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
    </div>
  );
};
