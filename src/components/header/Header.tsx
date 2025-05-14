import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SwitchThemeButton from "./SwitchThemeButton";
import WelcomeAdminPanel from "./WelcomeAdminPanel";
import WelcomeUserPanel from "./WelcomeUserPanel";
import { useMediaQuery, useTheme } from "@mui/material";

export default function Header({
  factoryName,
  isAdmin,
  drawerWidth,
  collapsedWidth,
  desktopOpen,
}: {
  factoryName?: string;
  isAdmin: boolean;
  drawerWidth: number;
  collapsedWidth: number;
  desktopOpen: boolean;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const currentDrawerWidth = isMobile
    ? 0
    : desktopOpen
    ? drawerWidth
    : collapsedWidth;
  const appBarWidth = `calc(100% - ${currentDrawerWidth + 28}px)`;

  return (
    <AppBar
      position="fixed"
      sx={{
        width: isMobile ? "95%" : appBarWidth,
        ml: isMobile ? 10 : `${currentDrawerWidth}px`,
        boxShadow: 0,
        bgcolor: "background.paper",
        borderRadius: "7px",
        marginX: "14px",
        marginY: "7px",
        transition: "all 0.1s ease-in-out",
        zIndex: (theme) => theme.zIndex.drawer - 1,
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
