import { List } from "@mui/material";
import SidebarItem from "./SidebarItem";
import { iconMap, iconMapForAdminPanel } from "@/utils/icons/iconsMenu";
import { useColorScheme } from "@mui/material/styles";
import { SidebarItemListProps } from "@/interfaces/UI/sidebar/sidebar";
import { useState } from "react";

const SidebarItemList = ({ items, sx, isAdmin }: SidebarItemListProps) => {
  const mode = useColorScheme();
  const [selectedItem, setSelectedItem] = useState<string>(isAdmin ? "کاربر" : "داشبورد");

  const handleItemClick = (itemName: string) => {
    setSelectedItem(itemName);
  };

  return (
    <>
      <List sx={sx}>
        {Object.entries(items).map(([text, { icon, to, onClick }], index) => {
          const IconComponent = isAdmin
            ? iconMapForAdminPanel[icon]
            : iconMap[icon];

          const isSelected = selectedItem === text;

          return (
            <SidebarItem
              key={index}
              selected={isSelected}
              text={text}
              link={to}
              icon={
                <IconComponent
                  stroke={mode.colorScheme === "dark" ? "#fff" : "#292D32"}
                />
              }
              onClick={() => {
                handleItemClick(text);
                onClick && onClick();
              }}
            />
          );
        })}
      </List>
    </>
  );
};

export default SidebarItemList;
