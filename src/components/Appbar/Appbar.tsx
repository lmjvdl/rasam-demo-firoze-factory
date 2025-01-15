"use client";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Box, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import SwitchThemeBtn from "../SwitchModeTheme/SwitchThemeBtn";
import currentDay from "@/utils/formatters/CurrentDay";
import { IconCalendar } from '@tabler/icons-react';

export const drawerWidth = 240;

export default function AppbarComp({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <IconCalendar stroke={1} />
          <Typography sx={{paddingLeft: "10px"}}>{currentDay}</Typography>
        </Box>

        <Typography
          sx={{
            flexGrow: 1,
            textAlign: "center",
          }}
        >
          به پنل مانیتورینگ کارخانه کاشی و سرامیک{" "}
          <Typography
            sx={{
              color: "var(--mui-palette-primary-main)",
              display: "inline-block",
              fontWeight: "bold",
            }}
          >
            ستاره میبد
          </Typography>{" "}
          خوش آمدید
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SwitchThemeBtn />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
