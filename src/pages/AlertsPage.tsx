import React from 'react';

import { PageHeader } from '../components/common/PageHeader';

export const AlertsPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <PageHeader 
        title="Alert History" 
        description="Review past loitering incidents" 
      />
      
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-cuslightgrey p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-cuslightgrey text-cusblack rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-text-h5 font-semibold text-cusblack">Alerts Table Pending</h2>
          <p className="text-cuslightblack mt-2 max-w-md">The historical alerts log and snapshot viewer will be implemented here.</p>
        </div>
      </div>
    </div>
  );
};
