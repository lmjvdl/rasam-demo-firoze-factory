import Drawer from "@mui/material/Drawer";
import { Box } from "@mui/material";
import { SidebarDrawerProps } from "@/interfaces/ui/sidebar/sidebar";


const SidebarDrawer = ({ open, onClose, children, variant }: SidebarDrawerProps) => {
  const drawerWidth = 240;

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      ModalProps={variant === "temporary" ? { keepMounted: true } : undefined}
      sx={{
        display: variant === "temporary" ? { xs: "block", sm: "none" } : { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
          border: 0,
          dir: "rtl",
          bgcolor: "background.defaultChannel",
        },
      }}
    >
      <Box>{children}</Box>
    </Drawer>
  );
};

export default SidebarDrawer;
