import useDataQuery from "@/hooks/adminDataQuery/useDataQuery";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import inputItemsUrls from "@/utils/url/adminPanel/inputItemUrl";
import outputItemUrls from "@/utils/url/adminPanel/outputItemUrl";
import intervalUrls from "@/utils/url/adminPanel/intervalUrl";
import productLinePartUrls from "@/utils/url/adminPanel/productLinePartUrl";

export const useReportExtraOptions = () => {
  const inputItemsList = useDataQuery(
    allQueryKeys.adminPanel.report.input_items_list,
    inputItemsUrls.listInputItem
  ).data?.map((input) => ({
    id: input.id,
    value: input.id,
    label: input.name,
  })) ?? [];

  const outputItemList = useDataQuery(
    allQueryKeys.adminPanel.report.output_items_list,
    outputItemUrls.listOutputItem
  ).data?.map((output) => ({
    id: output.id,
    value: output.id,
    label: output.name,
  })) ?? [];

  const intervalsList = useDataQuery(
    allQueryKeys.adminPanel.report.intervals_list,
    intervalUrls.listInterval
  ).data?.map((interval) => ({
    id: interval.id,
    value: interval.id,
    label: interval.name,
  })) ?? [];

  const productLinePartList = useDataQuery(
    allQueryKeys.adminPanel.report.product_line_part_list,
    productLinePartUrls.listProductLinePart
  ).data?.map((productLinePart) => ({
    id: productLinePart.id,
    value: productLinePart.id,
    label: productLinePart.name,
  })) ?? [];

  const inputItemsOptions = inputItemsList.map(({ label, value }) => ({
    label,
    value,
  }));

  const outputItemOptions = outputItemList.map(({ label, value }) => ({
    label,
    value,
  }));

  const intervalsOptions = intervalsList.map(({ label, value }) => ({
    label,
    value,
  }));

  const productLinePartOptions = productLinePartList.map(({ label, value }) => ({
    label,
    value,
  }));


  return {
    inputItemsList,
    outputItemList,
    intervalsList,
    productLinePartList,
    inputItemsOptions,
    outputItemOptions,
    intervalsOptions,
    productLinePartOptions,
  };
};