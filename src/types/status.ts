export interface StatusResponse {
  status: string;
  project_name: string;
  api_version: string;
  debug_mode: boolean;
  pipeline_status: string;
  pipeline_fps: number;
  active_zones_count: number;
}
