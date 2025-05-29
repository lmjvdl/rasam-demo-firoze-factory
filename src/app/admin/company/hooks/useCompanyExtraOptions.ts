import useIcons from "@/hooks/reactQueryApiHooks/useIcon";

export const useCompanyExtraOptions = () => {
  const { icons } = useIcons();

  const iconList = icons?.map((icon) => ({
    id: icon.id,
    value: icon.url,
    label: icon.url,
  })) ?? [];

  return {
    iconList,
  };
};