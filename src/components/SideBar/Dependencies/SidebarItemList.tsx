import { List } from "@mui/material";
import SidebarItem from "./SidebarItem";
import { iconMap, iconMapForAdminPanel } from "@/utils/icons/iconsMenu";
import { useColorScheme } from "@mui/material/styles";
import { SidebarItemListProps } from "@/interfaces/UI/sidebar/sidebar";

const SidebarItemList = ({ items, sx, isAdmin }: SidebarItemListProps) => {
  const mode = useColorScheme();

  return (
    <>
      <List sx={sx}>
        {Object.entries(items).map(([text, { icon, to, onClick }], index) => {
          const IconComponent = isAdmin
            ? iconMapForAdminPanel[icon]
            : iconMap[icon];
          return (
            <SidebarItem
              key={index}
              text={text}
              link={to}
              icon={
                <IconComponent
                  stroke={mode.colorScheme === "dark" ? "#fff" : "#292D32"}
                />
              }
              onClick={onClick}
            />
          );
        })}
      </List>
    </>
  );
};

export default SidebarItemList;
