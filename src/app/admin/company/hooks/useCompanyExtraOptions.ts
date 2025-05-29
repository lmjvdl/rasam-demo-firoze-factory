import useIcons from "@/hooks/reactQueryApiHooks/useIcon";

export const useCompanyExtraOptions = () => {
  const { icons } = useIcons();

  const iconList = icons?.map((icon) => ({
    id: icon.id,
    value: icon.id,
    label: icon.url,
  })) ?? [];

  const iconOptions = iconList.map(({ label, value }) => ({
    label,
    value,
  }));

  return {
    iconList,
    iconOptions,
  };
};