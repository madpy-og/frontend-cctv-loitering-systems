import React from 'react';
import { getAlertSnapshotUrl } from '../../api/alertsApi';
import { Modal } from '../common/Modal';

interface AlertSnapshotModalProps {
  isOpen: boolean;
  alertId: number | null;
  onClose: () => void;
}

export const AlertSnapshotModal: React.FC<AlertSnapshotModalProps> = ({ isOpen, alertId, onClose }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Incident Snapshot" 
      subtitle={`Alert #${alertId}`}
      maxWidth="4xl"
    >
      <div className="p-1 bg-cuslightgrey/20 flex justify-center items-center min-h-[300px]">
        <img 
          src={getAlertSnapshotUrl(alertId)} 
          alt={`Snapshot for alert ${alertId}`}
          className="max-w-full max-h-[70vh] object-contain rounded-lg border border-cuslightgrey"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // Prevent infinite loop
            target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18987b7a67b%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18987b7a67b%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23f3f4f6%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22268.5%22%20y%3D%22218.3%22%3EImage%20Not%20Found%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
          }}
        />
      </div>
    </Modal>
  );
};
