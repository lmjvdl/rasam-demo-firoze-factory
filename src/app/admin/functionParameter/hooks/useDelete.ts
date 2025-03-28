import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import functionParameterUrls from "@/utils/url/adminPanel/functionParameter/functionParameterUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";

const useDeleteFunctionParameter = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteFunctionParameterMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetchWithErrorForDelete(
        functionParameterUrls.deleteFunctionParameter(id),
        {
          method: "DELETE",
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: allQueryKeys.adminPanel.functionParameter.delete,
      });
    },
    onError: () => {
      showToast("خطایی در حذف پارامتر فانکشن رخ داد.", "error");
    },
  });

  return {
    deleteFunctionParameterMutation,
  };
};

export default useDeleteFunctionParameter;
