import { LiveManager } from "@/interfaces/user/lives/manager";
import OneSensorLiveCard from "./OneSensor";
import MultiSensorLiveCard from "./MultiSensor";
import LoadingScreen from "../loadingScreen/LoadingScreen";

export default function LiveCardManager(manager: LiveManager) {
  if (!manager?.type || !manager?.data) {
    <LoadingScreen />
  }

  switch (manager.type) {
    case "oneSensor":
      return <OneSensorLiveCard container={manager.data} />;
    case "multiSensor":
      return <MultiSensorLiveCard container={manager.data} />;
    default:
      return null;
  }
}
