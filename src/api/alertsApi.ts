import apiClient from './client';
import type { Alert } from '../types/alert';

export const getAlerts = async (limit: number = 50, offset: number = 0): Promise<Alert[]> => {
  const response = await apiClient.get<Alert[]>('/alerts/', {
    params: { limit, offset }
  });
  return response.data;
};

export const getAlertSnapshotUrl = (alertId: number): string => {
  const baseURL = import.meta.env.VITE_API_BASE_URL || '/api/v1';
  return `${baseURL}/alerts/${alertId}/snapshot`;
};
