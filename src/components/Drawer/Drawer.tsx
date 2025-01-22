"use client";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import {
  Box,
  Divider,
  Grid2,
  useColorScheme,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import DrawerItem from "./DrawerItem";
import { iconMap, companyMap } from "@/utils/icons/iconsMenu";

const DrawerSide = ({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const drawerWidth = 240;
  const mode = useColorScheme();
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const drawerItemInfoByKey: Record<string, { icon: string; to: string }> = {
    داشبورد: { icon: "Dashboard", to: "/dashboard" },
    "بسته بندی": { icon: "Packaging", to: "/packaging" },
    "تهیه بدنه": { icon: "BodyPrep", to: "/preparing-body" },
    "تابلو برق": { icon: "PowerSupply", to: "/power-supply" },
    چمفر: { icon: "Chamfer", to: "/chamfer" },
  };

  const footerItemInfoByKey: Record<string, { icon: string; to: string }> = {
    تنظمیات: { icon: "Settings", to: "/settings" },
    خروج: { icon: "Logout", to: "/login" },
  };

  const FactoryIcon = companyMap["Setare"];

  const drawer = (
    <Box>
      <Grid2
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="start"
        sx={{ marginBlock: "15px" }}
      >
        <FactoryIcon fill={mode.colorScheme == "dark" ? "#fff" : "#292D32"} />
      </Grid2>
      <Box></Box>
      <List>
        {Object.entries(drawerItemInfoByKey).map(
          ([text, { icon, to }], index) => {
            const IconComponent = iconMap[icon];
            return (
              <DrawerItem
                key={index}
                text={text}
                link={to}
                icon={
                  <IconComponent
                    stroke={mode.colorScheme == "dark" ? "#fff" : "#292D32"}
                  />
                }
              />
            );
          }
        )}
      </List>

      <List
        sx={{
          position: "absolute",
          width: "100%",
          bottom: 0,
        }}
      >
        <Divider variant="fullWidth" />
        {Object.entries(footerItemInfoByKey).map(
          ([text, { icon, to }], index) => {
            const IconComponent = iconMap[icon];
            return (
              <DrawerItem
                key={index}
                text={text}
                link={to}
                icon={
                  <IconComponent
                    stroke={mode.colorScheme == "dark" ? "#fff" : "#292D32"}
                  />
                }
              />
            );
          }
        )}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },

          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      {/* Desktop Drawer */}

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            border: 0,
            dir: "rtl",
            bgcolor: "background.defaultChannel",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default DrawerSide;
