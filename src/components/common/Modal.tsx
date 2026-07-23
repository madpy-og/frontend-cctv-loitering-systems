import React from 'react';
import { useModal } from '../../hooks/useModal';
import { X } from 'lucide-react';
import { IconButton } from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'md',
}) => {
  useModal(isOpen, onClose);

  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-cusblack/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative bg-white rounded-2xl w-full ${maxWidthClasses[maxWidth]} overflow-hidden animate-in fade-in zoom-in duration-200 border border-cuslightgrey`}>
        {title && (
          <div className="flex justify-between items-center p-6 border-b border-cuslightgrey bg-cuswhite">
            <div>
              <h3 className="text-text-h6 font-bold text-cusblack">{title}</h3>
              {subtitle && <p className="text-bs text-cuslightblack mt-0.5">{subtitle}</p>}
            </div>
            <IconButton 
              onClick={onClose}
              icon={<X size={20} />}
              aria-label="Close modal"
              className="text-cusdarkgrey hover:text-cusblack"
            />
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
