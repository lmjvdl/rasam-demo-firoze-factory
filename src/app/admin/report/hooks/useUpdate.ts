import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import { extractId, extractIds } from "@/utils/formatters/extractId";
import dataTypeUrls from "@/utils/url/adminPanel/dataTypeUrl";

export type ReportUpdateSchema = {
  id: number;
  name: string;
  input_items_info: { id: number; name: string }[];
  output_item_info: { id: number; name: string }[];
  intervals_info: { id: number; name: string }[];
  api_func_info: string;
  product_line_part_info: { id: number; name: string };
};

const useUpdate = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateReportMutation = useMutation({
    mutationFn: async ({ id, input_items_info, output_item_info, intervals_info, product_line_part_info,...updatedData }: ReportUpdateSchema) => {
      return fetchWithErrorWithAlarm(dataTypeUrls.editDataType(id), {
        method: "PUT",
        body: JSON.stringify({
          ...updatedData, 
          input_items: extractIds(input_items_info),
          output_item: extractIds(output_item_info),
          intervals: extractIds(intervals_info),
          product_line_part: extractId(product_line_part_info)
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.dataType.update });
    },
    onError: () => {
      showToast("خطایی در به‌روزرسانی نوع داده رخ داد.", "error");
    },
  });

  return {
    updateReportMutation,
  };
};

export default useUpdate;
