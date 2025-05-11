import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import productLinePartUrls from "@/utils/url/adminPanel/productLinePartUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import { extractId } from "@/utils/formatters/extractId";

export type ProductLinePartUpdateSchema = {
  id: number;
  product_line: { id: number; name: string };
  name: string;
  code: string;
  icon: string;
};

const useUpdateProductLinePart = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateProductLinePartMutation = useMutation<unknown, Error, ProductLinePartUpdateSchema>({
    mutationFn: async ({ id, product_line, icon, ...updatedData }) => {
      fetchWithErrorWithAlarm(productLinePartUrls.editProductLinePart(id), {
        method: "PUT",
        body: JSON.stringify({
          ...updatedData,
          product_line_info: extractId(product_line),
          icon: icon === "" ? null : Number(icon)
        }),
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

