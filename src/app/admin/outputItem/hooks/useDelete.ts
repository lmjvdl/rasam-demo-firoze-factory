import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import outputItemUrls from "@/utils/url/adminPanel/outputItemUrl";

const useDeleteOutputItem = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteOutputItemMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetchWithErrorForDelete(outputItemUrls.deleteOutputItem(id), {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.outputItem.delete })
    },
    onError: () => {
      showToast("خطایی در حذف آیتم خروجی رخ داد.", "error");
    },
  });

  return {
    deleteOutputItemMutation,
  };
};

export default useDeleteOutputItem;
