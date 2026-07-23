import React, { useState } from 'react';
import { X } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cusblack/50 backdrop-blur-sm transition-all">
      <div className="bg-white rounded-2xl shadow-xl border border-cuslightgrey w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-cuslightgrey bg-cuswhite">
          <h3 className="text-text-h6 font-bold text-cusblack">Save New Zone</h3>
          <button 
            onClick={onClose}
            className="text-cusdarkgrey hover:text-cusblack transition-colors"
          >
            <X size={20} />
          </button>
        </div>
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
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-cuslightgrey text-cusblack font-medium hover:bg-cuslightgrey transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="px-6 py-2.5 rounded-xl bg-cusblack text-cuswhite font-medium hover:bg-cusdarkgrey transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              Save Zone
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
