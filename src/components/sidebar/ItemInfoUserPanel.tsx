import { useMemo } from "react";
import { useColorScheme } from "@mui/material";
import {
  staticDrawerItems,
  staticFooterItems,
} from "./dependencies/ConstansParts";

export const UseItemInfoUserPanel = () => {
  const mode = useColorScheme();
  
  const drawerItemInfoForUserPanel = useMemo(() => {
    const filteredStaticItems = Object.entries(staticDrawerItems)
      .reduce((acc, [key, item]) => {
        acc[key] = item;
        return acc;
      }, {} as typeof staticDrawerItems);

    return {
      ...filteredStaticItems,
    };
  }, [mode.colorScheme]);

  const footerItemInfoForUserPanel = useMemo(() => {
    return Object.entries(staticFooterItems)
      .reduce((acc, [key, item]) => {
        acc[key] = {
          ...item,
        };
        return acc;
      }, {} as typeof staticFooterItems);
  }, []);

  return { drawerItemInfoForUserPanel, footerItemInfoForUserPanel };
};
