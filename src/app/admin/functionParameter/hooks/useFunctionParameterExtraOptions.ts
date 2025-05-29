import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import functionUrls from "@/utils/url/adminPanel/functionUrl";

export const useFunctionParameterExtraOptions = () => {
  const functionList = useDataQuery(
    allQueryKeys.adminPanel.functionParameter.function_list,
    functionUrls.listFunction
  ).data?.map((func) => ({
    id: func.id,
    value: func.id,
    label: func.name,
  })) ?? [];

  const functionOptions = functionList.map(({ label, value }) => ({
    label,
    value,
  }));


  return {
    functionList,
    functionOptions,
  };
};