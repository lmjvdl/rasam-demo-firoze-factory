import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import productLineUrls from "@/utils/url/adminPanel/productLine/productLineUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import { extractId } from "@/utils/formatters/extractId";

export type ProductLineUpdateSchema = {
  id: number;
  company_info: { id: number; name: string };
  name: string;
  code: string;
  icon: string;
};

const useUpdateProductLine = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  
  const updateProductLineMutation = useMutation({
    mutationFn: async ({ id, company_info, icon, ...updatedData }: ProductLineUpdateSchema) => {
      return fetchWithErrorWithAlarm(productLineUrls.editProductLine(id), {
        method: "PUT",
        body: JSON.stringify({...updatedData, company_info: extractId(company_info), icon:Number(icon)}),
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
