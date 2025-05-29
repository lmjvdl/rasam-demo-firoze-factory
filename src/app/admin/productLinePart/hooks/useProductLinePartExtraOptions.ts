import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import useIcons from "@/hooks/reactQueryApiHooks/useIcon";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import liveTypesUrls from "@/utils/url/adminPanel/liveTypesUrl";
import productLineUrls from "@/utils/url/adminPanel/productLineUrl";

export const useProductLinePartExtraOptions = () => {
  const { icons } = useIcons();

  const productLineList = useDataQuery(
    allQueryKeys.adminPanel.productLinePart.product_line_list,
    productLineUrls.listProductLine
  ).data?.map((product_line) => ({
    id: product_line.id,
    value: product_line.id,
    label: product_line.name,
  })) ?? [];

  const liveTypeList = useDataQuery(
    allQueryKeys.adminPanel.productLinePart.live_type_list,
    liveTypesUrls.listLiveTypes
  ).data?.map((live_type) => ({
    id: live_type.id,
    value: live_type.id,
    label: live_type.name,
  })) ?? [];

  const iconList = icons?.map((icon) => ({
    id: icon.id,
    value: icon.id,
    label: icon.url,
  })) ?? [];

  const productLineOptions = productLineList.map(({ label, value }) => ({
    label,
    value,
  }));

  const liveTypeOptions = liveTypeList.map(({ label, value }) => ({
    label,
    value,
  }));

  return {
    liveTypeList,
    productLineList,
    iconList,
    productLineOptions,
    liveTypeOptions
  };
};