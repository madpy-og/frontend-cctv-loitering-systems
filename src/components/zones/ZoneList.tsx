import React from 'react';
import { Map, Power, PowerOff, Trash2 } from 'lucide-react';
import type { Zone } from '../../types/zone';

interface ZoneListProps {
  zones: Zone[];
  hoveredZoneId: number | null;
  setHoveredZoneId: (id: number | null) => void;
  onToggleActive: (zone: Zone) => void;
  onDelete: (id: number) => void;
}

export const ZoneList: React.FC<ZoneListProps> = ({
  zones,
  hoveredZoneId,
  setHoveredZoneId,
  onToggleActive,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-cuslightgrey p-6 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-cuslightgrey">
        <Map size={20} className="text-cusblack" />
        <h3 className="text-text-bd font-semibold text-cusblack">Configured Zones</h3>
        <span className="ml-auto bg-cuslightgrey text-cusdarkgrey text-text-capt px-2 py-0.5 rounded-full font-bold">
          {zones.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-3">
        {zones.length === 0 ? (
          <div className="text-center text-cusdarkgrey py-8 border-2 border-dashed border-cuslightgrey rounded-xl">
            <p className="text-text-bs font-medium">No zones configured.</p>
            <p className="text-text-capt mt-1">Draw a new zone on the canvas.</p>
          </div>
        ) : (
          zones.map((zone) => (
            <div 
              key={zone.id}
              className={`p-4 rounded-xl border transition-all cursor-default ${
                hoveredZoneId === zone.id 
                  ? 'border-cusdarkgrey bg-cuswhite shadow-sm' 
                  : 'border-cuslightgrey bg-white hover:border-cusdarkgrey/30'
              }`}
              onMouseEnter={() => setHoveredZoneId(zone.id)}
              onMouseLeave={() => setHoveredZoneId(null)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0 pr-2">
                  <h4 className="text-text-bs font-bold text-cusblack truncate">{zone.name}</h4>
                  <p className="text-text-capt text-cusdarkgrey mt-0.5">
                    {zone.points.length} vertices
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => onToggleActive(zone)}
                    className={`p-1.5 rounded-lg border border-cuslightgrey transition-colors ${
                      zone.is_active 
                        ? 'text-cusblack bg-cuswhite hover:border-cusdarkgrey' 
                        : 'text-cusdarkgrey bg-white hover:border-cusdarkgrey'
                    }`}
                    title={zone.is_active ? "Deactivate Zone" : "Activate Zone"}
                  >
                    {zone.is_active ? <Power size={14} /> : <PowerOff size={14} />}
                  </button>
                  <button
                    onClick={() => onDelete(zone.id)}
                    className="p-1.5 rounded-lg text-cusdarkgrey border border-cuslightgrey bg-white hover:border-cusdarkgrey hover:text-cusblack transition-colors"
                    title="Delete Zone"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${zone.is_active ? 'bg-cusblack animate-pulse' : 'bg-cuslightgrey'}`}></span>
                <span className={`text-text-capt font-bold uppercase tracking-wider ${zone.is_active ? 'text-cusblack' : 'text-cusdarkgrey'}`}>
                  {zone.is_active ? 'Monitoring Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
