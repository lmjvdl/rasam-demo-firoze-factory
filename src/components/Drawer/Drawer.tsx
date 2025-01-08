"use client";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { Box, Toolbar } from "@mui/material";
import { Dispatch, ReactNode, SetStateAction } from "react";
import DrawerItem from "./DrawerItem";
import { Drafts, Email, Inbox, Star } from "@mui/icons-material";

const DrawerSide = ({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const drawerWidth = 240;

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  const drawerItemInfoByKey: Record<string, { icon: ReactNode; to: string }> = {
    "بسته بندی": { icon: <Inbox />, to: "/packaging" },
    خوبی: { icon: <Star />, to: "/starred" },
    "ایتم سومی ۳": { icon: <Email />, to: "/send-email" },
    بالمیل: { icon: <Drafts />, to: "/drafts" },
  };
  const drawer = (
    <Box>
      <Toolbar />
      <List>
        {Object.keys(drawerItemInfoByKey).map((text, index) => (
          <DrawerItem
            key={index}
            text={text}
            link={drawerItemInfoByKey[text].to}
            icon={drawerItemInfoByKey[text].icon}
          />
        ))}
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
