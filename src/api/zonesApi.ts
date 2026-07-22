import apiClient from './client';
import type { Zone, ZoneCreate, ZoneUpdate } from '../types/zone';

export const getZones = async (): Promise<Zone[]> => {
  const response = await apiClient.get<Zone[]>('/zones/');
  return response.data;
};

export const createZone = async (zone: ZoneCreate): Promise<Zone> => {
  const response = await apiClient.post<Zone>('/zones/', zone);
  return response.data;
};

export const updateZone = async (id: number, zone: ZoneUpdate): Promise<Zone> => {
  const response = await apiClient.put<Zone>(`/zones/${id}`, zone);
  return response.data;
};

export const deleteZone = async (id: number): Promise<{ message: string }> => {
  const response = await apiClient.delete<{ message: string }>(`/zones/${id}`);
  return response.data;
};
