import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import productLineUrls from "@/utils/url/adminPanel/productLineUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import { extractId } from "@/utils/formatters/extractId";

export type ProductLineUpdateSchema = {
  id: number;
  company: { id: number; name: string };
  name: string;
  code: string;
  dark_icon: string;
  light_icon: string;
};

const useUpdateProductLine = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  
  const updateProductLineMutation = useMutation({
    mutationFn: async ({ id, company, dark_icon, light_icon, ...updatedData }: ProductLineUpdateSchema) => {
      return fetchWithErrorWithAlarm(productLineUrls.editProductLine(id), {
        method: "PUT",
        body: JSON.stringify({
          ...updatedData,
          company_info: extractId(company), 
          light_icon: light_icon === "" ? null : Number(light_icon),
          dark_icon: dark_icon === "" ? null : Number(dark_icon),
        }),
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
