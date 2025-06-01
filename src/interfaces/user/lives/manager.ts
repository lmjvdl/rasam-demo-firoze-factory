import { MultiSensorLiveSchema } from "./multiSensor"
import { OneSensorLiveSchema } from "./oneSensor"

export interface LiveManager {
    type: "oneSensor" | "multiSensor" | "packaging" | "chart"
    data: OneSensorLiveSchema | MultiSensorLiveSchema
}