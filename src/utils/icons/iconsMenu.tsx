// ************************* Importing all the (MAIN MODULE) available on the site ************************
import {
    BodyPrep,
    Dashboard,
    Packaging,
    Settings,
    Logout,
    Chamfer,
    PowerSupply
  } from "../../../public/logo/itemMenu";
  // **************************** Importing the (LOGOS) of all existing factories ****************************
  import { Setare } from "../../../public/logo/company";
  // ************************************* Importing (FOOTER ITEM) FIXED *************************************
  import { IconSettings, IconLogout } from "@tabler/icons-react";
  
  
  // **************  Define interface for props (STROKE) to icon component in main sidebar *************
  interface IconProps {
    stroke: string;
  }
  
  // ***************  Define interface for props (FILL) to icon component in main sidebar **************
  interface logoProps {
    fill: string;
  }
  
  // *************  Map for name to icon component in main sidebar ****************
  export const iconMap: Record<string, React.FC<IconProps>> = {
    Dashboard: Dashboard,
    Packaging: Packaging,
    BodyPrep: BodyPrep,
    PowerSupply: PowerSupply,
    Chamfer: Chamfer,
    Settings: Settings,
    Logout: Logout,
    // Add other mappings as necessary
  };
  // *******************************************************************************
  
  // *************  Define name to icon component in footer sidebar ****************
  export const FooterIcons = () => {
    return (
      <>
        <IconSettings size={24} />
        <IconLogout size={24} />
      </>
    );
  };
  // *******************************************************************************
  
  export const companyMap: Record<string, React.FC<logoProps>> = {
    Setare: Setare,
  };
  