import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import productLinePartUrls from "@/utils/url/adminPanel/productLinePart/productLinePartUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";

const useDeleteProductLinePart = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteProductLinePartMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetchWithErrorForDelete(
        productLinePartUrls.deleteProductLinePart(id),
        {
          method: "DELETE",
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: allQueryKeys.adminPanel.productLinePart.delete,
      });
    },
    onError: () => {
      showToast("خطایی در حذف بخش خط محصول رخ داد.", "error");
    },
  });

  return {
    deleteProductLinePartMutation,
  };
};

export default useDeleteProductLinePart;
