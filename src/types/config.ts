export interface SystemConfig {
  loitering_threshold_seconds: number;
  grace_period_seconds: number;
}

export interface SystemConfigUpdate {
  loitering_threshold_seconds?: number;
  grace_period_seconds?: number;
}
