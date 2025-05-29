import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import productLineUrls from "@/utils/url/adminPanel/productLineUrl";
import groupUrls from "@/utils/url/adminPanel/groupUrl";
import positionUrls from "@/utils/url/adminPanel/positionUrl";

export const useUserExtraOptions = () => {
  const productLineList = useDataQuery(
    allQueryKeys.adminPanel.productLine.list,
    productLineUrls.listProductLine
  ).data?.map((product_line) => ({
    id: product_line.id,
    value: product_line.id,
    label: product_line.name,
  })) ?? [];

  const groupList = useDataQuery(
    allQueryKeys.adminPanel.group.list,
    groupUrls.listGroup
  ).data?.map((group) => ({
    id: group.id,
    value: group.id,
    label: group.name,
  })) ?? [];

  const positionList = useDataQuery(
    allQueryKeys.adminPanel.position.list,
    positionUrls.listPosition
  ).data?.map((position) => ({
    id: position.id,
    value: position.id,
    label: position.name,
  })) ?? [];

  const productLineOptions = productLineList.map(({ label, value }) => ({
    label,
    value,
  }));

  const groupOptions = groupList.map(({ label, value }) => ({
    label,
    value,
  }));

  const positionOptions = positionList.map(({ label, value }) => ({
    label,
    value,
  }));

  return {
    productLineList,
    groupList,
    positionList,
    productLineOptions,
    groupOptions,
    positionOptions,
  };
};