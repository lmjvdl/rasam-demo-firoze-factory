// ************************* Importing all the available on the site ************************
import {
    BatchBaalMill,
    ContinuesBallMill,
    GranuleSillo,
    SlurryPit,
    SlurryPump,
    SprayDryer,
    VibratingScreen
} from "../../../public/assets/icons/layoutBodyPrep/LayoutBodyPrep";
  
// **************  Define interface for props (WIDTH, HEIGHT) to icon component in main sidebar *************
interface IconProps {
    width: number;
    height: number;
}
  
// *************  Map for name to icon component in main sidebar ****************
export const iconMapLayout: Record<string, React.FC<IconProps>> = {
    BatchBaalMill: BatchBaalMill,
    ContinuesBallMill: ContinuesBallMill,
    GranuleSillo: GranuleSillo,
    SlurryPit: SlurryPit,
    SlurryPump: SlurryPump,
    SprayDryer: SprayDryer,
    VibratingScreen: VibratingScreen
    // Add other mappings as necessary
};
