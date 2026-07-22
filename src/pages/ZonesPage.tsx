import React from 'react';

export const ZonesPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-text-h3 font-serif font-bold text-cusdarkblack">Zone Editor</h1>
        <p className="text-cuslightblack text-text-bs mt-1">Configure monitoring zones and rules</p>
      </div>
      
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-cuslightgrey p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <h2 className="text-text-h5 font-semibold text-cusblack">Zone Canvas Pending</h2>
          <p className="text-cuslightblack mt-2 max-w-md">The interactive canvas for drawing and editing loitering zones will be built here.</p>
        </div>
      </div>
    </div>
  );
};
