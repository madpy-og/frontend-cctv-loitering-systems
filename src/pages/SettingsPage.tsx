import React from 'react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-text-h3 font-serif font-bold text-cusdarkblack">System Settings</h1>
        <p className="text-cuslightblack text-text-bs mt-1">Manage global system configurations</p>
      </div>
      
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-cuslightgrey p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-caution/10 text-caution rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-text-h5 font-semibold text-cusblack">Settings Form Pending</h2>
          <p className="text-cuslightblack mt-2 max-w-md">System configuration options like timezone, stream URL, and confidence thresholds will be here.</p>
        </div>
      </div>
    </div>
  );
};
