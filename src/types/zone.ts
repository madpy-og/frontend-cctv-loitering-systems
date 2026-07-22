export interface ZonePoint {
  x: number;
  y: number;
}

export interface Zone {
  id: number;
  name: string;
  is_active: boolean;
  created_at: string;
  points: ZonePoint[];
}

export interface ZoneCreate {
  name: string;
  points: ZonePoint[];
  is_active?: boolean;
}

export interface ZoneUpdate {
  name?: string;
  points?: ZonePoint[];
  is_active?: boolean;
}
