import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import useIcons from "@/hooks/reactQueryApiHooks/useIcon";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import companyUrls from "@/utils/url/adminPanel/companyUrl";
import liveTypesUrls from "@/utils/url/adminPanel/liveTypesUrl";

export const useProductLineExtraOptions = () => {
  const { icons } = useIcons();

  const companyList = useDataQuery(
    allQueryKeys.adminPanel.productLine.company_list,
    companyUrls.listCompany
  ).data?.map((company) => ({
    id: company.id,
    value: company.id,
    label: company.name,
  })) ?? [];

  const liveTypeInfoList = useDataQuery(
    allQueryKeys.adminPanel.productLine.live_type_info_list,
    liveTypesUrls.listLiveTypes
  ).data?.map((live) => ({
    id: live.id,
    value: live.id,
    label: live.name,
  })) ?? [];

  const iconList = icons?.map((icon) => ({
    id: icon.id,
    value: icon.id,
    label: icon.url,
  })) ?? [];

  const companyOptions = companyList.map(({ label, value }) => ({
    label,
    value,
  }));

  const liveTypeInfoOptions = companyList.map(({ label, value }) => ({
    label,
    value,
  }));


  return {
    companyList,
    iconList,
    liveTypeInfoList,
    companyOptions,
    liveTypeInfoOptions
  };
};