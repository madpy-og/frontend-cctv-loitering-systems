import React, { useRef, type MouseEvent } from 'react';
import type { Zone, ZonePoint } from '../../types/zone';
import { getVideoFeedUrl } from '../../api/videoApi';

interface ZoneCanvasProps {
  zones: Zone[];
  isDrawing: boolean;
  draftPoints: ZonePoint[];
  onAddDraftPoint: (point: ZonePoint) => void;
  hoveredZoneId: number | null;
}

export const ZoneCanvas: React.FC<ZoneCanvasProps> = ({
  zones,
  isDrawing,
  draftPoints,
  onAddDraftPoint,
  hoveredZoneId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCanvasClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDrawing || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate proportional coordinates (0.0 to 1.0)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Ensure coordinates are exactly within bounds
    const clampedX = Math.max(0, Math.min(1, x));
    const clampedY = Math.max(0, Math.min(1, y));

    onAddDraftPoint({ x: clampedX, y: clampedY });
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full aspect-video bg-cusblack rounded-2xl overflow-hidden border transition-colors ${
        isDrawing ? 'border-cusdarkgrey cursor-crosshair shadow-[0_0_15px_rgba(128,128,128,0.2)]' : 'border-cuslightgrey'
      }`}
      onClick={handleCanvasClick}
    >
      {/* Background Image */}
      <img
        src={getVideoFeedUrl()}
        alt="Camera feed background"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none opacity-80"
        onError={(e) => {
          // Fallback if image fails to load
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />

      {/* Fallback pattern if image fails */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(45deg,#2c2c2c_25%,transparent_25%,transparent_75%,#2c2c2c_75%,#2c2c2c),linear-gradient(45deg,#2c2c2c_25%,transparent_25%,transparent_75%,#2c2c2c_75%,#2c2c2c)] bg-[length:20px_20px] bg-[position:0_0,10px_10px] opacity-20"></div>

      {/* SVG Overlay for drawing zones */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Render Saved Zones */}
        {zones.map((zone) => {
          if (zone.points.length < 3) return null;
          
          const pointsString = zone.points
            .map((p) => `${p.x * 100},${p.y * 100}`)
            .join(' ');
            
          const isHovered = hoveredZoneId === zone.id;
          
          return (
            <polygon
              key={zone.id}
              points={pointsString}
              className={`transition-all duration-300 ${
                !zone.is_active 
                  ? 'fill-[#808080]/10 stroke-[#808080]/50' 
                  : isHovered
                    ? 'fill-[#F7F7F7]/20 stroke-[#F7F7F7]'
                    : 'fill-[#DFDFDF]/10 stroke-[#DFDFDF]/70'
              }`}
              strokeWidth={isHovered ? "0.6" : "0.3"}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
        
        {/* Render Draft Zone */}
        {draftPoints.length > 0 && (
          <>
            {/* Draw polygon if 3 or more points to show preview */}
            {draftPoints.length >= 3 && (
               <polygon
                points={draftPoints.map(p => `${p.x * 100},${p.y * 100}`).join(' ')}
                className="fill-[#F7F7F7]/10"
               />
            )}

            {/* Draw lines between points */}
            {draftPoints.length > 1 && (
              <polyline
                points={draftPoints.map(p => `${p.x * 100},${p.y * 100}`).join(' ')}
                className="fill-none stroke-[#F7F7F7]"
                strokeWidth="0.4"
                strokeDasharray="1 1"
                vectorEffect="non-scaling-stroke"
              />
            )}
            
            {/* Draw closing line if we have at least 3 points */}
            {draftPoints.length >= 3 && (
              <line
                x1={draftPoints[draftPoints.length - 1].x * 100}
                y1={draftPoints[draftPoints.length - 1].y * 100}
                x2={draftPoints[0].x * 100}
                y2={draftPoints[0].y * 100}
                className="stroke-[#F7F7F7]/50"
                strokeWidth="0.4"
                strokeDasharray="1 1"
                vectorEffect="non-scaling-stroke"
              />
            )}

            {/* Draw points */}
            {draftPoints.map((p, i) => (
              <circle
                key={i}
                cx={p.x * 100}
                cy={p.y * 100}
                r="1"
                className="fill-[#F7F7F7] stroke-[#020202]"
                strokeWidth="0.2"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </>
        )}
      </svg>
    </div>
  );
};
