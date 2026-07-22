export interface Alert {
  id: number;
  timestamp: string;
  track_id: number;
  duration: number;
  snapshot_path: string | null;
  zone_id: number | null;
  is_resolved: boolean;
}
