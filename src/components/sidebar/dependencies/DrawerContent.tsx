import { Grid2, useColorScheme } from "@mui/material";
import { companyMap } from "@/utils/icons/IconsMenu";
import SidebarItemList from "./SidebarItemList";
import { DrawerContentProps } from "@/interfaces/ui/sidebar/sidebar";

const DrawerContent = ({
  drawerItemInfoByKey,
  footerItemInfoByKey,
  isAdmin
}: DrawerContentProps) => {
  const mode = useColorScheme();
  const FactoryIcon = isAdmin ? companyMap["Rasam"] : companyMap["Setare"];

  return (
    <>
      <Grid2
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="start"
        sx={{ marginBlock: "px" }}
      >
        <FactoryIcon fill={mode.colorScheme === "dark" ? "#fff" : "#292D32"} />
      </Grid2>
      <SidebarItemList items={drawerItemInfoByKey} isAdmin={isAdmin}/>
      <SidebarItemList
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          borderTop: `1px solid ${
            mode.colorScheme === "dark" ? "#fff" : "#292D32"
          }`,
        }}
        items={footerItemInfoByKey}
        isAdmin={isAdmin}
      />
    </>
  );
};

export default DrawerContent;
