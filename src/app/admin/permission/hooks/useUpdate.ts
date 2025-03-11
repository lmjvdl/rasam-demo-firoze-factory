import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import productLineUrls from "@/utils/URLs/adminPanel/productLine/productLineUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/UI/useToast";

export type ProductLineUpdateSchema = {
  id: number;
  company: number;
  name: string;
  code: string;
  icon?: number;
};

const useUpdateProductLine = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateProductLineMutation = useMutation({
    mutationFn: async ({ id, ...updatedData }: ProductLineUpdateSchema) => {
      return fetchWithErrorWithAlarm(productLineUrls.editProductLine(id), {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.productLine.update });
    },
    onError: () => {
      showToast("خطایی در به‌روزرسانی خط تولید رخ داد.", "error");
    },
  });

  return {
    updateProductLineMutation,
  };
};

export default useUpdateProductLine;
