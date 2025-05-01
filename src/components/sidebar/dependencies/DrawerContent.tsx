import { Box, Grid2, useColorScheme } from "@mui/material";
import { companyMap } from "@/utils/icons/IconsMenu";
import SidebarItemList from "./SidebarItemList";
import { DrawerContentProps } from "@/interfaces/ui/sidebar/sidebar";

const DrawerContent = ({
  drawerItemInfoByKey,
  footerItemInfoByKey,
  isAdmin,
  isCollapsed = false,
}: DrawerContentProps) => {
  const mode = useColorScheme();
  const FactoryIcon = isAdmin
    ? mode.colorScheme === "light"
      ? companyMap["RasamLight"]
      : companyMap["RasamDark"]
    : companyMap["Setare"];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Grid2
        container
        spacing={0}
        direction="column"
        sx={{
          pt: 2,
          display: { xs: "none", sm: isCollapsed ? "none" : "flex" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FactoryIcon fill={mode.colorScheme === "dark" ? "#fff" : "#292D32"} />
      </Grid2>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          direction: "rtl",
          
          "& > *": {
            direction: "ltr",
          },
        }}
      >
        <SidebarItemList 
          items={drawerItemInfoByKey} 
          isAdmin={isAdmin} 
          isCollapsed={isCollapsed} 
        />
      </Box>
      <Box
        sx={{
          borderTop: `1px solid ${
            mode.colorScheme === "dark" ? "#fff" : "#292D32"
          }`,
          pt: 1,
          pb: 1,
          background: "background.defaultChannel",
        }}
      >
        <SidebarItemList 
          items={footerItemInfoByKey} 
          isAdmin={isAdmin} 
          isCollapsed={isCollapsed} 
        />
      </Box>
    </Box>
  );
};

export default DrawerContent;