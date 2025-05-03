import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Dispatch, SetStateAction } from "react";
import SwitchThemeButton from "./SwitchThemeButton";
import WelcomeAdminPanel from "./WelcomeAdminPanel";
import WelcomeUserPanel from "./WelcomeUserPanel";
import ControlMobileHeader from "./ControlMobileHeader";
import { Box, useMediaQuery, useTheme } from "@mui/material";

export default function Header({
  mobileOpen,
  setMobileOpen,
  factoryName,
  isAdmin,
  drawerWidth,
  collapsedWidth,
  desktopOpen,
}: {
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
  factoryName?: string;
  isAdmin: boolean;
  drawerWidth: number;
  collapsedWidth: number;
  desktopOpen: boolean;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const currentDrawerWidth = isMobile ? 0 : desktopOpen ? drawerWidth : collapsedWidth;
  const appBarWidth = `calc(100% - ${currentDrawerWidth+28}px)`;

  return (
    <AppBar
      position="fixed"
      sx={{
        width: isMobile ? "100%" : appBarWidth,
        ml: isMobile ? 0 : `${currentDrawerWidth}px`,
        boxShadow: 0,
        bgcolor: "background.paper",
        borderRadius: "7px",
        marginRight: "14px",
        marginY: "7px",
        transition: "all 0.1s ease-in-out",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      enableColorOnDark
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ControlMobileHeader
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        {!isAdmin ? (
          <WelcomeUserPanel factoryName={factoryName} />
        ) : (
          <WelcomeAdminPanel />
        )}
        <SwitchThemeButton />
      </Toolbar>
    </AppBar>
  );
}
