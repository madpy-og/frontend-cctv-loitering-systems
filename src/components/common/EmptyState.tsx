import React from 'react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200 h-full min-h-[150px] ${className}`}>
      {icon && <div className="text-cuslightblack mb-3">{icon}</div>}
      <h4 className="text-text-bs font-medium text-cusblack mb-1">{title}</h4>
      {description && <p className="text-text-capt text-cuslightblack max-w-sm mb-4">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
};
