import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import alarmUrls from "@/utils/url/adminPanel/alarmUrl";
import functionParameterUrls from "@/utils/url/adminPanel/functionParameterUrl";

export const useAlarmDetailExtraOptions = () => {
  const alarmList = useDataQuery(
    allQueryKeys.adminPanel.alarmDetail.alarm_list,
    alarmUrls.listAlarm
  ).data?.map((alarm) => ({
    id: alarm.id,
    value: alarm.id,
    label: alarm.name,
  })) ?? [];

  const parameterList = useDataQuery(
    allQueryKeys.adminPanel.alarmDetail.parameter_list,
    functionParameterUrls.listFunctionParameter
  ).data?.map((parameter) => ({
    id: parameter.id,
    value: parameter.id,
    label: parameter.name,
  })) ?? [];

  const alarmOptions = alarmList.map(({ label, value }) => ({
    label,
    value,
  }));

  const parameterOptions = parameterList.map(({ label, value }) => ({
    label,
    value,
  }));

  return {
    alarmList,
    parameterList,
    alarmOptions,
    parameterOptions,
  };
};