import { List } from "@mui/material";
import SidebarItem from "./SidebarItem";
import { iconMap, iconMapForAdminPanel } from "@/utils/icons/IconsMenu";
import { useColorScheme } from "@mui/material/styles";
import { SidebarItemListProps } from "@/interfaces/ui/sidebar/sidebar";
import { useState } from "react";
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const SidebarItemList = ({ items, sx, isAdmin }: SidebarItemListProps) => {
  const mode = useColorScheme();
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState<string>("");

  useEffect(() => {
    const userPanelPaths = Object.entries(items).map(([text, { to }]) => ({
      text,
      to,
      isExact: to === '/dashboard'
    }));

    const findSelectedItem = () => {
      if (!isAdmin) {
        const exactMatch = userPanelPaths.find(item => pathname === item.to);
        if (exactMatch) return exactMatch.text;
        
        const partialMatch = userPanelPaths
          .filter(item => !item.isExact)
          .find(item => pathname.startsWith(item.to));
        
        return partialMatch?.text || "داشبورد";
      }
      return Object.entries(items).find(([_, { to }]) => 
        pathname.startsWith(to)
      )?.[0] || "کاربر";
    };

    setSelectedItem(findSelectedItem());
  }, [pathname, items, isAdmin]);


  return (
    <>
      <List sx={sx}>
        {Object.entries(items).map(([text, { icon, to, onClick }], index) => {
          const IconComponent = isAdmin
            ? iconMapForAdminPanel[icon]
            : iconMap[icon];

          const isSelected = selectedItem === text;

          function handleItemClick(text: string) {
            throw new Error("Function not implemented.");
          }

          return (
            <SidebarItem
              key={index}
              selected={isSelected}
              text={text}
              link={to}
              icon={
                <IconComponent
                  stroke={
                    isSelected 
                      ? "#fff" 
                      : mode.colorScheme === "dark" 
                        ? "#fff" 
                        : "#292D32"
                  }
                />
              }
              onClick={() => {
                handleItemClick(text);
                onClick?.();
              }}
            />
          );
        })}
      </List>
    </>
  );
};

export default SidebarItemList;
