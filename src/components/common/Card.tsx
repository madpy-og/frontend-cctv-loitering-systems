import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  padding?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, padding = true, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl border border-cuslightgrey overflow-hidden flex flex-col ${className}`}>
      {padding ? (
        <div className="p-6 h-full flex flex-col min-h-0">
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export interface CardHeaderProps {
  icon?: React.ReactNode;
  title: string;
  action?: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ icon, title, action, className = '' }) => {
  return (
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      <div className="flex items-center gap-2">
        {icon && <div className="text-cusblack">{icon}</div>}
        <h3 className="text-text-h6 font-semibold text-cusblack">{title}</h3>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};
