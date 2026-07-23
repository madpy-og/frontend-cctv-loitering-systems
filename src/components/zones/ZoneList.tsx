import React from 'react';
import { Map, Power, PowerOff, Trash2 } from 'lucide-react';
import type { Zone } from '../../types/zone';
import { IconButton } from '../common/Button';
import { Badge } from '../common/Badge';
import { Card, CardHeader } from '../common/Card';
import { EmptyState } from '../common/EmptyState';

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
    <Card className="flex flex-col h-full">
      <CardHeader 
        title="Configured Zones"
        icon={<Map size={20} />}
        action={
          <Badge variant="default" shape="pill" className="ml-auto px-2 py-0.5 text-cusdarkgrey font-bold">
            {zones.length}
          </Badge>
        }
        className="mb-6 pb-4 border-b border-cuslightgrey"
      />

      <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-3">
        {zones.length === 0 ? (
          <EmptyState 
            icon={<Map size={32} />}
            title="No zones configured"
            description="Use the map toolbar to draw and save zones for monitoring."
          />
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
                  <IconButton
                    onClick={() => onToggleActive(zone)}
                    icon={zone.is_active ? <Power size={14} /> : <PowerOff size={14} />}
                    aria-label={zone.is_active ? "Deactivate Zone" : "Activate Zone"}
                    title={zone.is_active ? "Deactivate Zone" : "Activate Zone"}
                    variant="secondary"
                    size="sm"
                    className={`rounded-lg ${zone.is_active ? 'text-cusblack bg-cuswhite' : 'text-cusdarkgrey bg-white'}`}
                  />
                  <IconButton
                    onClick={() => onDelete(zone.id)}
                    icon={<Trash2 size={14} />}
                    aria-label="Delete Zone"
                    title="Delete Zone"
                    variant="secondary"
                    size="sm"
                    className="rounded-lg text-cusdarkgrey bg-white hover:text-danger hover:border-danger/30"
                  />
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
    </Card>
  );
};
