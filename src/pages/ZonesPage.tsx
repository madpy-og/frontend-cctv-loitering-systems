import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { PageHeader } from '../components/common/PageHeader';
import { ZoneCanvas } from '../components/zones/ZoneCanvas';
import { ZoneCanvasToolbar } from '../components/zones/ZoneCanvasToolbar';
import { ZoneList } from '../components/zones/ZoneList';
import { ZoneFormModal } from '../components/zones/ZoneFormModal';
import { getZones, createZone, updateZone, deleteZone } from '../api/zonesApi';
import type { Zone, ZonePoint } from '../types/zone';

export const ZonesPage: React.FC = () => {
  const [zones, setZones] = useState<Zone[]>([]);
  const [hoveredZoneId, setHoveredZoneId] = useState<number | null>(null);
  
  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [draftPoints, setDraftPoints] = useState<ZonePoint[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch zones on mount
  const fetchZones = async () => {
    try {
      const data = await getZones();
      setZones(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to fetch zones');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

  // Drawing Handlers
  const handleStartDrawing = () => {
    setIsDrawing(true);
    setDraftPoints([]);
  };

  const handleCancelDrawing = () => {
    setIsDrawing(false);
    setDraftPoints([]);
  };

  const handleAddDraftPoint = (point: ZonePoint) => {
    setDraftPoints((prev) => [...prev, point]);
  };

  const handleSaveDraftClick = () => {
    if (draftPoints.length >= 3) {
      setIsModalOpen(true);
    }
  };

  // CRUD Handlers
  const handleSaveZone = async (name: string) => {
    try {
      await createZone({ name, points: draftPoints, is_active: true });
      toast.success(`Zone "${name}" created successfully`);
      setIsModalOpen(false);
      setIsDrawing(false);
      setDraftPoints([]);
      fetchZones(); // Refresh list
    } catch (error) {
      toast.error('Failed to create zone');
      console.error(error);
    }
  };

  const handleToggleActive = async (zone: Zone) => {
    try {
      await updateZone(zone.id, { is_active: !zone.is_active });
      setZones(zones.map(z => z.id === zone.id ? { ...z, is_active: !z.is_active } : z));
      toast.success(`Zone ${!zone.is_active ? 'activated' : 'deactivated'}`);
    } catch (error) {
      toast.error('Failed to update zone status');
      console.error(error);
    }
  };

  const handleDeleteZone = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this zone?')) return;
    
    try {
      await deleteZone(id);
      setZones(zones.filter(z => z.id !== id));
      toast.success('Zone deleted successfully');
    } catch (error) {
      toast.error('Failed to delete zone');
      console.error(error);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <PageHeader 
        title="Zone Editor" 
        description="Configure monitoring zones and rules" 
      />
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden pb-4">
        {/* Main Canvas Area */}
        <div className="lg:col-span-2 h-full flex flex-col min-h-[400px]">
          <ZoneCanvas 
            zones={zones}
            isDrawing={isDrawing}
            draftPoints={draftPoints}
            onAddDraftPoint={handleAddDraftPoint}
            hoveredZoneId={hoveredZoneId}
          />
          <ZoneCanvasToolbar 
            isDrawing={isDrawing}
            canSave={draftPoints.length >= 3}
            onStartDrawing={handleStartDrawing}
            onCancelDrawing={handleCancelDrawing}
            onSaveDraft={handleSaveDraftClick}
          />
        </div>
        
        {/* Sidebar List Area */}
        <div className="h-full overflow-hidden min-h-[300px]">
          <ZoneList 
            zones={zones}
            hoveredZoneId={hoveredZoneId}
            setHoveredZoneId={setHoveredZoneId}
            onToggleActive={handleToggleActive}
            onDelete={handleDeleteZone}
          />
        </div>
      </div>

      <ZoneFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveZone}
      />
    </div>
  );
};
