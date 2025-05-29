import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import productLinePartUrls from "@/utils/url/adminPanel/productLinePartUrl";
import dataTypeUrls from "@/utils/url/adminPanel/dataTypeUrl";

export const useDeviceExtraOptions = () => {
  const productLinePartList = useDataQuery(
    allQueryKeys.adminPanel.devices.product_line_part_list,
    productLinePartUrls.listProductLinePart
  ).data?.map((product_line_part) => ({
    id: product_line_part.id,
    value: product_line_part.id,
    label: product_line_part.name,
  })) ?? [];

  const dataTypeList = useDataQuery(
    allQueryKeys.adminPanel.devices.data_type_list,
    dataTypeUrls.listDataType
  ).data?.map((data_type) => ({
    id: data_type.id,
    value: data_type.id,
    label: data_type.name,
  })) ?? [];

  const productLinePartOptions = productLinePartList.map(({ label, value }) => ({
    label,
    value,
  }));

  const dataTypeOptions = dataTypeList.map(({ label, value }) => ({
    label,
    value,
  }));

  return {
    productLinePartList,
    dataTypeList,
    productLinePartOptions,
    dataTypeOptions,
  };
};