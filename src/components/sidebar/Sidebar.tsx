"use client";
import {
  Box,
  IconButton,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import SidebarDrawer from "./dependencies/SidebarDrawer";
import DrawerContent from "./dependencies/DrawerContent";
import { UseItemInfoUserPanel } from "./UseItemInfoUserPanel";
import { UseItemInfoAdminPanel } from "./UseItemInfoAdminPanel";
import { useRouter } from "next/navigation";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";

const Sidebar = ({
  mobileOpen,
  setMobileOpen,
  isAdmin,
  drawerWidth,
  collapsedWidth,
  desktopOpen,
  setDesktopOpen,
}: {
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
  isAdmin: boolean;
  drawerWidth: number;
  collapsedWidth: number;
  desktopOpen: boolean;
  setDesktopOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerClose = () => {
    setMobileOpen(false);
    if (isMobile) {
      setDesktopOpen(true);
    }
  };

  const handleToggleDrawer = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setDesktopOpen(!desktopOpen);
    }
  };

  useEffect(() => {
    if (isAdmin === false) {
      router.push("/login");
    } else if (isAdmin === true) {
      if (window.location.pathname === "/admin") {
        router.push("/admin/user");
      }
    } else {
      if (window.location.pathname === "/") {
        router.push("/dashboard");
      }
    }
  }, [isAdmin, router]);

  const { drawerItemInfoForUserPanel, footerItemInfoForUserPanel } =
    UseItemInfoUserPanel();
  const { drawerItemInfoForAdminPanel, footerItemInfoForAdminPanel } =
    UseItemInfoAdminPanel();

  const drawerItemInfo = isAdmin
    ? drawerItemInfoForAdminPanel
    : drawerItemInfoForUserPanel;
  const footerItemInfo = isAdmin
    ? footerItemInfoForAdminPanel
    : footerItemInfoForUserPanel;

  const ToggleButton = styled(IconButton)(({ theme }) => ({
    position: "fixed",
    left: isMobile
      ? "30px"
      : isMobile && mobileOpen
      ? "300px"
      : desktopOpen
      ? `${drawerWidth - 20}px`
      : "20px",
    top: "300px",
    zIndex: theme.zIndex.modal + 1,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: isMobile && !mobileOpen ? "translateX(-50%)" : "none",
    transition: theme.transitions.create(["left", "transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  }));

  return (
    <>
      {/* Toggle button should always be rendered above everything */}
      <ToggleButton onClick={handleToggleDrawer}>
        {desktopOpen || mobileOpen ? (
          <IconChevronRight size={20} />
        ) : (
          <IconChevronLeft size={20} />
        )}
      </ToggleButton>

      <Box
        component="nav"
        sx={{
          width: {
            sm: desktopOpen ? drawerWidth : collapsedWidth,
          },
          flexShrink: { sm: 0 },
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          zIndex: 1000,
        }}
        aria-label="mailbox folders"
      >
        <SidebarDrawer
          open={mobileOpen}
          onClose={handleDrawerClose}
          variant="temporary"
          drawerWidth={drawerWidth}
        >
          <DrawerContent
            drawerItemInfoByKey={drawerItemInfo}
            footerItemInfoByKey={footerItemInfo}
            isAdmin={isAdmin}
            isCollapsed={false}
          />
        </SidebarDrawer>

        <SidebarDrawer
          open={true}
          onClose={() => {}}
          variant="permanent"
          drawerWidth={desktopOpen ? drawerWidth : collapsedWidth}
        >
          <DrawerContent
            drawerItemInfoByKey={drawerItemInfo}
            footerItemInfoByKey={footerItemInfo}
            isAdmin={isAdmin}
            isCollapsed={!desktopOpen}
          />
        </SidebarDrawer>
      </Box>
    </>
  );
};

export default Sidebar;
