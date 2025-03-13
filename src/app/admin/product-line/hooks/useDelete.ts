import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import productLineUrls from "@/utils/url/adminPanel/productLine/productLineUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";

const useDeleteProductLine = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteProductLineMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetchWithErrorForDelete(productLineUrls.deleteProductLine(id), {
        method: "DELETE",
      });
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.productLine.delete });
    },
    onError: () => {
      showToast("خطایی در حذف خط محصول رخ داد.", "error");
    },
  });

  return {
    deleteProductLineMutation,
  };
};

export default useDeleteProductLine;
