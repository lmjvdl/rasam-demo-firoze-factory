import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import functionUrls from "@/utils/url/adminPanel/function/functionUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";

const useDeleteFunction = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteFunctionMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetchWithErrorForDelete(functionUrls.deleteFunction(id), {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: allQueryKeys.adminPanel.function.delete,
      });
    },
    onError: () => {
      showToast("خطایی در حذف فانکشن رخ داد.", "error");
    },
  });

  return {
    deleteFunctionMutation,
  };
};

export default useDeleteFunction;
