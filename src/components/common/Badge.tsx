import React from 'react';

export type BadgeVariant = 'default' | 'success' | 'danger' | 'info' | 'warning';
export type BadgeShape = 'rounded' | 'pill';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  shape?: BadgeShape;
  className?: string;
  leftIcon?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-cuslightgrey text-cusblack border-cusdarkgrey/20',
  success: 'bg-success/10 text-success border-transparent',
  danger: 'bg-danger/10 text-danger border-transparent',
  info: 'bg-information/10 text-information border-transparent',
  warning: 'bg-caution/10 text-caution border-transparent',
};

const shapeStyles: Record<BadgeShape, string> = {
  rounded: 'rounded',
  pill: 'rounded-full',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  shape = 'rounded',
  className = '',
  leftIcon,
}) => {
  const baseStyles = 'inline-flex items-center px-2 py-0.5 text-text-capt font-semibold tracking-wider border';
  
  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${shapeStyles[shape]} ${className}`}>
      {leftIcon && <span className="mr-1 flex items-center">{leftIcon}</span>}
      {children}
    </span>
  );
};
