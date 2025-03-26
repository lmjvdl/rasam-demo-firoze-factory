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
    const findSelectedItem = () => {
      // Convert items to array and sort by path length (longest first)
      // This ensures nested routes (like '/admin/functionParameter') are checked 
      // before their parent routes ('/admin/function')
      const sortedItems = Object.entries(items)
        .map(([text, { to }]) => ({ text, to, length: to.length }))
        .sort((a, b) => b.length - a.length);

      // Find the first item where:
      // 1. Current path starts with the item's path (for nested routes)
      // 2. Exact match with the item's path
      // 3. Match with trailing slash (common in some routing scenarios)
      const matchedItem = sortedItems.find(item => 
        pathname.startsWith(item.to) || 
        pathname === item.to ||
        pathname === `${item.to}/`
      );

      // Fallback to default item if no match found
      return matchedItem?.text || (isAdmin ? "کاربر" : "داشبورد");
    };

    // Update selected item whenever pathname changes
    setSelectedItem(findSelectedItem());
  }, [pathname, items, isAdmin]);


  return (
    <>
      <List sx={sx}>
        {Object.entries(items).map(([text, { icon, to }], index) => {
          // Select appropriate icon set based on admin/user mode
          const IconComponent = isAdmin
            ? iconMapForAdminPanel[icon]
            : iconMap[icon];

          // Determine if current item is selected
          const isSelected = selectedItem === text;
          
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
            />
          );
        })}
      </List>
    </>
  );
};

export default SidebarItemList;