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
  light_icon: string;
  dark_icon: string;
  live_type: { id: number; name: string } | null;
};

const useUpdateProductLinePart = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateProductLinePartMutation = useMutation<unknown, Error, ProductLinePartUpdateSchema>({
    mutationFn: async ({ id, product_line, light_icon, dark_icon, live_type, ...updatedData }) => {
      fetchWithErrorWithAlarm(productLinePartUrls.editProductLinePart(id), {
        method: "PUT",
        body: JSON.stringify({
          ...updatedData,
          product_line_info: extractId(product_line),
          light_icon: light_icon === "" ? null : Number(light_icon),
          dark_icon: dark_icon === "" ? null : Number(dark_icon),
          live_type_info: live_type !== null ? extractId(live_type) : null 
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

