import React from 'react';
import { ConfigForm } from '../components/settings/ConfigForm';

export const SettingsPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex justify-center overflow-y-auto">
        <ConfigForm />
      </div>
    </div>
  );
};
