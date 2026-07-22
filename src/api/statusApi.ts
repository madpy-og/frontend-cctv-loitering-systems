import apiClient from './client';
import type { StatusResponse } from '../types/status';

export const getStatus = async (): Promise<StatusResponse> => {
  const response = await apiClient.get<StatusResponse>('/status');
  return response.data;
};
