import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import companyUrls from "@/utils/url/adminPanel/companyUrl";

export const useShiftExtraOptions = () => {
  const companyList = useDataQuery(
    allQueryKeys.adminPanel.shift.company_list,
    companyUrls.listCompany
  ).data?.map((company) => ({
    id: company.id,
    value: company.id,
    label: company.name,
  })) ?? [];

  const companyOptions = companyList.map(({ label, value }) => ({
    label,
    value,
  }));

  return {
    companyList,
    companyOptions,
  };
};