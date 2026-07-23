import React from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { LiveVideoFeed } from '../components/dashboard/LiveVideoFeed';
import { SystemStatusCard } from '../components/dashboard/SystemStatusCard';
import { RecentAlertsCard } from '../components/dashboard/RecentAlertsCard';

export const DashboardPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <PageHeader 
        title="Dashboard" 
        description="System overview and live feed" 
      />
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        {/* Main Video Feed Area - takes up 2/3 of the width on large screens */}
        <div className="lg:col-span-2 h-full min-h-[400px]">
          <LiveVideoFeed />
        </div>
        
        {/* Side Panel for Status and Alerts - takes up 1/3 of the width on large screens */}
        <div className="flex flex-col gap-6 h-full overflow-hidden">
          <div className="flex-none">
            <SystemStatusCard />
          </div>
          <div className="flex-1 min-h-[300px]">
            <RecentAlertsCard />
          </div>
        </div>
      </div>
    </div>
  );
};
