// ************************* Importing all the (MAIN MODULE) available on the site ************************
import {
  BodyPrep,
  Dashboard,
  Packaging,
  Settings,
  Logout,
  Chamfer,
  PowerSupply,
} from "../../../public/assets/logo/itemMenu";
import {
  Company,
  Devices,
  Group,
  Permission,
  ProductLine,
  ProductLinePart,
  UploadImage,
  User,
  DataType,
  DeviceType,
  Function,
  FunctionParameter,
  Alarm,
  AlarmDetail,
  Contacts,
  Operation,
  SmsLog,
  Interval,
  Report,
  InputItem,
  OutputItem,
} from "../../../public/assets/logo/ItemMenuAdmin";
// **************************** Importing the (LOGOS) of all existing factories ****************************
import {
  RasamDark,
  RasamLight,
  Setare,
} from "../../../public/assets/logo/company";
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
  User: User,
  DeviceType: DeviceType,
  DataType: DataType,
  Function: Function,
  FunctionParameter: FunctionParameter,
  Alarm: Alarm,
  AlarmDetail: AlarmDetail,
  Contacts: Contacts,
  Operation: Operation,
  SmsLog: SmsLog,
  Report: Report,
  Interval: Interval,
  InputItem: InputItem,
  OutputItem: OutputItem,
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
  RasamLight: RasamLight,
  RasamDark: RasamDark,
};
