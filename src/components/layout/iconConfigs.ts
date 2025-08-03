import { Device } from "@/interfaces/user/layout/layoutBodyPrep";

export const getIconDimensions = (type: Device["type"]) => {
    switch (type) {
        case "BatchBaalMill":
            return { width: 28, height: 14 };
        case "SprayDryer":
            return { width: 130, height: 110 };
        case "SlurryPump":
            return { width: 13, height: 10 };
        case "SlurryPitRight":
            return { width: 33, height: 13 };
        case "SlurryPitLeft":
            return { width: 33, height: 13 };
        case "ContinuesBallMill":
            return { width: 30, height: 48 };
        case "VibratingScreen":
            return { width: 6, height: 10 };
        case "GranuleSillo":
            return { width: 14, height: 14 };
    }
};