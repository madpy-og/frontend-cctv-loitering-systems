import apiClient from './client';
import { SystemConfig, SystemConfigUpdate } from '../types/config';

export const getConfig = async (): Promise<SystemConfig> => {
  const response = await apiClient.get<SystemConfig>('/config/');
  return response.data;
};

export const updateConfig = async (config: SystemConfigUpdate): Promise<SystemConfig> => {
  const response = await apiClient.put<SystemConfig>('/config/', config);
  return response.data;
};
