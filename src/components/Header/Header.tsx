"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Dispatch, SetStateAction } from "react";
import SwitchThemeButton from "./SwitchThemeButton";
import WelcomeAdminPanel from "./WelcomeAdminPanel";
import WelcomeUserPanel from "./WelcomeUserPanel";
import ControlMobileHeader from "./ControlMobileHeader";

export const drawerWidth = 240;

export default function Header({
  mobileOpen,
  setMobileOpen,
  factoryName,
  isAdmin,
}: {
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
  factoryName?: string;
  isAdmin: boolean;
}) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        boxShadow: 0,
        bgcolor: "background.defaultChannel",
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
        <ControlMobileHeader mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
        {!isAdmin ? (
          <WelcomeUserPanel factoryName={factoryName}/>
        ) : (
          <WelcomeAdminPanel />
        )}
        <SwitchThemeButton />
      </Toolbar>
    </AppBar>
  );
}
