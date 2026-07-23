import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-8">
      <h1 className="text-h6 font-serif font-semibold text-cusblack">{title}</h1>
      <p className="text-cuslightblack text-bs mt-1">{description}</p>
    </div>
  );
};
