import React from 'react';
import type { Alert } from '../../types/alert';

interface AlertTableProps {
  alerts: Alert[];
  isLoading: boolean;
  onViewSnapshot: (alertId: number) => void;
}

export const AlertTable: React.FC<AlertTableProps> = ({ alerts, isLoading, onViewSnapshot }) => {
  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const m = Math.floor(seconds / 60);
    const s = Math.round(seconds % 60);
    return s > 0 ? `${m}m ${s}s` : `${m}m`;
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date);
  };

  if (isLoading && alerts.length === 0) {
    return (
      <div className="w-full flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cusblue"></div>
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-12 text-center">
        <div className="w-12 h-12 bg-cuslightgrey rounded-full flex items-center justify-center mb-3">
          <svg className="w-6 h-6 text-cuslightblack" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-text-body font-semibold text-cusblack">No Alerts Found</h3>
        <p className="text-cuslightblack text-sm mt-1">There are no loitering incidents to display.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-cuslightgrey text-cuslightblack text-xs uppercase tracking-wider">
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
            <tr key={alert.id} className="hover:bg-slate-50 transition-colors duration-150">
              <td className="py-4 px-6 text-sm text-cusblack whitespace-nowrap">
                {formatDate(alert.timestamp)}
              </td>
              <td className="py-4 px-6 text-sm text-cusblack">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                  #{alert.track_id}
                </span>
              </td>
              <td className="py-4 px-6 text-sm text-cusblack">
                {alert.zone_id ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    Zone {alert.zone_id}
                  </span>
                ) : (
                  <span className="text-gray-400 italic">Global</span>
                )}
              </td>
              <td className="py-4 px-6 text-sm text-cusblack font-medium text-red-600">
                {formatDuration(alert.duration)}
              </td>
              <td className="py-4 px-6 text-sm">
                {alert.is_resolved ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Resolved
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Active
                  </span>
                )}
              </td>
              <td className="py-4 px-6 text-right">
                <button
                  onClick={() => onViewSnapshot(alert.id)}
                  disabled={!alert.snapshot_path}
                  className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cusblue transition-colors
                    ${alert.snapshot_path 
                      ? 'bg-cusblue hover:bg-blue-600' 
                      : 'bg-gray-300 cursor-not-allowed text-gray-500'}`}
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Snapshot
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
