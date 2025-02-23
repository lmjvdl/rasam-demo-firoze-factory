import { Grid2, useColorScheme } from "@mui/material";
import { companyMap } from "@/utils/icons/iconsMenu";
import SidebarItemList from "./SidebarItemList";
import { DrawerContentProps } from "@/interfaces/UI/sidebar/sidebar";

const DrawerContent = ({
  drawerItemInfoByKey,
  footerItemInfoByKey,
  isAdmin
}: DrawerContentProps) => {
  const mode = useColorScheme();
  const FactoryIcon = companyMap["Setare"];

  return (
    <>
      <Grid2
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="start"
        sx={{ marginBlock: "15px" }}
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
