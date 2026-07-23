import React from 'react';
import { Bell } from 'lucide-react';
import { IconButton } from '../common/Button';
import { useLocation } from 'react-router';

const routeInfo: Record<string, { title: string; description: string }> = {
  '/': { title: 'Dashboard', description: 'Real-time overview of CCTV feeds and recent alerts' },
  '/zones': { title: 'Zone Editor', description: 'Configure monitoring zones and rules' },
  '/alerts': { title: 'Alert History', description: 'Review past loitering incidents' },
  '/settings': { title: 'System Settings', description: 'Manage global system configurations and detection parameters' },
};

export const Header: React.FC = () => {
  const location = useLocation();
  const currentRoute = routeInfo[location.pathname] || { title: 'CCTV Dashboard', description: '' };

  return (
    <header className="h-20 bg-cuswhite border-b border-cuslightgrey flex items-center justify-between px-4 z-10 sticky top-0">

      {/* Dynamic Page Header */}
      <div>
        <h1 className="text-h6 font-serif font-semibold text-cusblack">{currentRoute.title}</h1>
        {currentRoute.description && (
          <p className="text-cuslightblack text-sm mt-0.5">{currentRoute.description}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <IconButton
          icon={<Bell size={20} />}
          aria-label="Notifications"
          className="rounded-full relative"
        >
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-cusdarkgrey rounded-full border-2 border-cuswhite"></span>
        </IconButton>
      </div>
    </header>
  );
};

