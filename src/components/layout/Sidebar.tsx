import React from 'react';
import { NavLink } from 'react-router';
import { LayoutDashboard, Map, AlertTriangle, Settings, Camera } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { to: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { to: '/zones', label: 'Zone Editor', icon: <Map size={20} /> },
    { to: '/alerts', label: 'Alert History', icon: <AlertTriangle size={20} /> },
    { to: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 h-[calc(100vh-2rem)] m-4 rounded-3xl bg-cusblack text-cuswhite flex flex-col shadow-xl overflow-hidden">
      <div className="p-6 flex justify-center items-center gap-3">
        <h1 className="font-serif text-h5 font-semibold tracking-wide">CCTV Dashboard</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                ? 'bg-cuswhite/10 text-cuswhite font-semibold text-bd'
                : 'text-cusgrey hover:bg-cuslightblack/20 hover:text-cuswhite text-bd font-semibold'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-cuswhite' : ''}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-cuslightblack/30">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-cuswhite flex items-center justify-center text-sm font-bold text-cusblack shadow-md">
            AD
          </div>
          <div>
            <p className="text-text-bs font-medium">Admin User</p>
            <p className="text-text-capt text-cusgrey">System Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
