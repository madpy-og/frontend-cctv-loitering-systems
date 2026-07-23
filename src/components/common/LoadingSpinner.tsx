import React from 'react';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  center?: boolean;
}

const sizeStyles = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
  center = false,
}) => {
  const spinner = (
    <svg
      className={`animate-spin text-information ${sizeStyles[size]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  if (center) {
    return <div className="flex justify-center items-center h-full w-full">{spinner}</div>;
  }

  return spinner;
};

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string;
  height?: string;
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
  count = 1,
}) => {
  const renderSkeleton = (index: number) => {
    if (variant === 'card') {
      return (
        <div key={index} className={`flex gap-3 items-center p-3 border border-cuslightgrey rounded-xl animate-pulse ${className}`}>
          <div className="w-12 h-12 bg-cuslightgrey/50 rounded-lg shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-cuslightgrey/50 rounded w-3/4"></div>
            <div className="h-3 bg-cuslightgrey/50 rounded w-1/2"></div>
          </div>
        </div>
      );
    }

    let baseClass = 'animate-pulse bg-cuslightgrey/50 ';
    
    if (variant === 'text') {
      baseClass += 'h-4 rounded ';
      if (!width) baseClass += 'w-full ';
    } else if (variant === 'circular') {
      baseClass += 'rounded-full ';
    } else {
      baseClass += 'rounded-md ';
    }

    if (width) baseClass += `${width} `;
    if (height) baseClass += `${height} `;

    return <div key={index} className={`${baseClass} ${className}`}></div>;
  };

  if (count === 1) return renderSkeleton(0);

  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => renderSkeleton(i))}
    </div>
  );
};
