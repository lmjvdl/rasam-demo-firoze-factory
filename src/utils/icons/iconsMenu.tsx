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
  import { Company, Devices, Group, Permission, ProductLine, ProductLinePart, UploadImage, User } from "../../../public/logo/ItemMenuAdmin";
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

  // *************  Map for name to icon component in main sidebar ****************
  export const iconMapForAdminPanel: Record<string, React.FC<IconProps>> = {
    ProductLinePart: ProductLinePart,
    ProductLine: ProductLine,
    Devices: Devices,
    UploadImage: UploadImage,
    Company: Company,
    Group: Group,
    Logout: Logout,
    Permission: Permission,
    User: User
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
  