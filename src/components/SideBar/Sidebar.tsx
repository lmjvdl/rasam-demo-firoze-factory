"use client";
import { Box } from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import SidebarDrawer from "./Dependencies/SidebarDrawer";
import DrawerContent from "./Dependencies/DrawerContent";
import { UseItemInfoUserPanel } from "./UseItemInfoUserPanel";
import { UseItemInfoAdminPanel } from "./UseItemInfoAdminPanel";
import { useRouter } from "next/navigation";

const Sidebar = ({
  mobileOpen,
  setMobileOpen,
  isAdmin,
}: {
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
  isAdmin: boolean;
}) => {
  const router = useRouter();
  const drawerWidth = 240;
  const handleDrawerClose = () => setMobileOpen(false);


  useEffect(() => {
    if (isAdmin === false) {
      router.push("/login");
    }
  }, [isAdmin, router]);

  const { drawerItemInfoForUserPanel, footerItemInfoForUserPanel } = UseItemInfoUserPanel();
  const { drawerItemInfoForAdminPanel, footerItemInfoForAdminPanel } = UseItemInfoAdminPanel();

  const drawerItemInfo = isAdmin ? drawerItemInfoForAdminPanel : drawerItemInfoForUserPanel;
  const footerItemInfo = isAdmin ? footerItemInfoForAdminPanel : footerItemInfoForUserPanel;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <SidebarDrawer
        open={mobileOpen}
        onClose={handleDrawerClose}
        variant="temporary"
      >
        <DrawerContent
          drawerItemInfoByKey={drawerItemInfo}
          footerItemInfoByKey={footerItemInfo}
          isAdmin={isAdmin}
        />
      </SidebarDrawer>
      <SidebarDrawer open={true} onClose={() => {}} variant="permanent">
        <DrawerContent
          drawerItemInfoByKey={drawerItemInfo}
          footerItemInfoByKey={footerItemInfo}
          isAdmin={isAdmin}
        />
      </SidebarDrawer>
    </Box>
  );
};

export default Sidebar;
