import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import inputItemsUrls from "@/utils/url/adminPanel/inputItemUrl";

const useDeleteInputItem = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteInputItemMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetchWithErrorForDelete(inputItemsUrls.deleteInputItem(id), {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.inputItem.delete })
    },
    onError: () => {
      showToast("خطایی در حذف آیتم ورودی رخ داد.", "error");
    },
  });

  return {
    deleteInputItemMutation,
  };
};

export default useDeleteInputItem;
