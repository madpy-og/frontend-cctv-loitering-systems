import React from 'react';

export const DashboardPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-text-h3 font-serif font-bold text-cusdarkblack">Dashboard</h1>
        <p className="text-cuslightblack text-text-bs mt-1">System overview and live feed</p>
      </div>
      
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-cuslightgrey p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-information/10 text-information rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-text-h5 font-semibold text-cusblack">Live View Pending</h2>
          <p className="text-cuslightblack mt-2 max-w-md">The main dashboard layout and live video feed will be implemented here.</p>
        </div>
      </div>
    </div>
  );
};
