import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { ConfigForm } from '../components/settings/ConfigForm';

export const SettingsPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <PageHeader 
        title="System Settings" 
        description="Manage global system configurations and detection parameters" 
      />
      
      <div className="flex-1 flex justify-center p-4 lg:p-8 overflow-y-auto">
        <ConfigForm />
      </div>
    </div>
  );
};
