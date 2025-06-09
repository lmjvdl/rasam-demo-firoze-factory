export interface Device {
    id: string;
    type:
      | "BatchBaalMill"
      | "ContinuesBallMill"
      | "GranuleSillo"
      | "SlurryPitRight"
      | "SlurryPitLeft"
      | "SlurryPump"
      | "SprayDryer"
      | "VibratingScreen";
    status: "blue" | "red" | "grey";
    lightsConfig: {
      orientation: "horizontal" | "vertical";
      position: "top" | "bottom" | "left" | "right" | "both" | "center";
    };
    startTime?: string; // Optional for grey status devices
  }
  
  // Define the Position interface for absolute positioning
export interface Position {
    top: number;
    left: number;
  }