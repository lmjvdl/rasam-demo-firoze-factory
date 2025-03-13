import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import productLinePartUrls from "@/utils/url/adminPanel/productLinePart/productLinePartUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";

export type ProductLinePartUpdateSchema = {
  id: number;
  product_line: number;
  name: string;
  code: string;
  icon?: number;
};

const useUpdateProductLinePart = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateProductLinePartMutation = useMutation({
    mutationFn: async ({ id, ...updatedData }: ProductLinePartUpdateSchema) => {
      return fetchWithErrorWithAlarm(productLinePartUrls.editProductLinePart(id), {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.productLinePart.update });
    },
    onError: () => {
      showToast("خطایی در به‌روزرسانی بخش خط تولید رخ داد.", "error");
    },
  });

  return {
    updateProductLinePartMutation,
  };
};

export default useUpdateProductLinePart;
