import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import operationUrls from "@/utils/url/adminPanel/operation/operation";

const useDeleteOperation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteOperationMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetchWithErrorForDelete(operationUrls.deleteOperation(id), {
        method: "DELETE",
      });
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.operation.delete })
    },
    onError: () => {
      showToast("خطایی در حذف عملیات رخ داد.", "error");
    },
  });

  return {
    deleteOperationMutation,
  };
};

export default useDeleteOperation;
