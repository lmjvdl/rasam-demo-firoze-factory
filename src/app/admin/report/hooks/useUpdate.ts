import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import { extractId, extractIds } from "@/utils/formatters/extractId";
import dataTypeUrls from "@/utils/url/adminPanel/dataTypeUrl";

export type ReportUpdateSchema = {
  id: number;
  name: string;
  input_items: { id: number; name: string }[];
  ouput_item: { id: number; name: string };
  intervals: { id: number; name: string }[];
  api_func: string;
  product_line_part: { id: number; name: string };
};

const useUpdate = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateReportMutation = useMutation({
    mutationFn: async ({ id, input_items, ouput_item, intervals, product_line_part,...updatedData }: ReportUpdateSchema) => {
      return fetchWithErrorWithAlarm(dataTypeUrls.editDataType(id), {
        method: "PUT",
        body: JSON.stringify({
          ...updatedData, 
          input_items: extractIds(input_items),
          output_item: extractId(ouput_item),
          intervals: extractIds(intervals),
          product_line_part: extractId(product_line_part)
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
