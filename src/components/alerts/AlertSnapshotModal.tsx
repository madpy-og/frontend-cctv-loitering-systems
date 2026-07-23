import React, { useEffect } from 'react';
import { getAlertSnapshotUrl } from '../../api/alertsApi';

interface AlertSnapshotModalProps {
  isOpen: boolean;
  alertId: number | null;
  onClose: () => void;
}

export const AlertSnapshotModal: React.FC<AlertSnapshotModalProps> = ({ isOpen, alertId, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || alertId === null) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-cuslightgrey">
          <div>
            <h3 className="text-text-h6 font-semibold text-cusblack">Incident Snapshot</h3>
            <p className="text-sm text-cuslightblack">Alert #{alertId}</p>
          </div>
          <button
            onClick={onClose}
            className="text-cuslightblack hover:text-cusblack p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-1 bg-gray-50 flex justify-center items-center min-h-[300px]">
          <img 
            src={getAlertSnapshotUrl(alertId)} 
            alt={`Snapshot for alert ${alertId}`}
            className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-sm border border-gray-200"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop
              target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18987b7a67b%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18987b7a67b%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23f3f4f6%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22268.5%22%20y%3D%22218.3%22%3EImage%20Not%20Found%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
            }}
          />
        </div>
      </div>
    </div>
  );
};
