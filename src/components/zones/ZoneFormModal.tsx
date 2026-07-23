import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

interface ZoneFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

export const ZoneFormModal: React.FC<ZoneFormModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name.trim());
      setName('');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Save New Zone"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-8">
            <label htmlFor="zoneName" className="block text-text-bs font-medium text-cusdarkgrey mb-2">
              Zone Name
            </label>
            <input
              id="zoneName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Front Entrance, Restricted Area"
              className="w-full px-4 py-3 rounded-xl border border-cuslightgrey focus:border-cusdarkgrey focus:ring-1 focus:ring-cusdarkgrey outline-none transition-all text-text-bs text-cusblack placeholder:text-cusgrey"
              autoFocus
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
              size="lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!name.trim()}
              variant="primary"
              size="lg"
            >
              Save Zone
            </Button>
          </div>
        </form>
    </Modal>
  );
};
