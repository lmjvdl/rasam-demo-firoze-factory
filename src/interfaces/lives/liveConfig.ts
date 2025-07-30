export interface LiveConfig {
    type: string;
}

export interface LiveValues {
    [deviceId: string]: {
      current?: number;
      temperature?: number;
      soilSurface?: number;
    };
}