import React from 'react';
import { Bell, Search } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-20 bg-cuswhite border-b border-cuslightgrey flex items-center justify-between px-8 z-10 sticky top-0">
      <div className="flex items-center bg-white border border-cuslightgrey rounded-full px-4 py-2 w-96 shadow-sm focus-within:border-cusdarkgrey focus-within:ring-2 focus-within:ring-cusdarkgrey/20 transition-all">
        <Search size={18} className="text-cusgrey mr-2" />
        <input 
          type="text" 
          placeholder="Search cameras, zones, or alerts..." 
          className="bg-transparent border-none outline-none text-text-bs w-full text-cusblack placeholder:text-cusgrey"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-cuslightgrey transition-colors text-cusblack">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-cusdarkgrey rounded-full border-2 border-cuswhite"></span>
        </button>
      </div>
    </header>
  );
};
