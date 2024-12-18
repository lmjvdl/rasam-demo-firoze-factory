"use client";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import {  Box, useColorScheme } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Android12Switch } from "../Button/DarkModeBtn";

export const drawerWidth = 240;

export default function AppbarComp({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
}) {
  // const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);

    // if (!isClosing) {
    //   setMobileOpen(!mobileOpen);
    // }
  };
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }
  return (
    <AppBar
      position="fixed"
      // sx={{ boxShadow: 0, bgcolor: "#fff" }}
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        boxShadow: 0,
        bgcolor: "background.defaultChannel",
      }}
      enableColorOnDark
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Android12Switch
          // checkedIcon={
          //   <BedtimeOutlined color="success" sx={{ p: 0, m: 0 }} />
          // }
          // icon={<WbSunnyOutlined color="success" sx={{ p: 0, m: 0 }} />}
          checked={mode === "dark"}
          onChange={() => {
            if (mode === "dark") {
              setMode("light");
            } else {
              setMode("dark");
            }
          }}
        />
      </Toolbar>
    </AppBar>
  );
}
