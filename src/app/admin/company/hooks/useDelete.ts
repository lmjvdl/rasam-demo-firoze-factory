import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import companyUrls from "@/utils/URLs/adminPanel/company/companyUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/UI/useToast";

const useDelete = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteCompanyMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetchWithErrorForDelete(companyUrls.deleteCompany(id), {
        method: "DELETE",
      });
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.company.delete});
    },
    onError: () => {
      showToast("خطایی در حذف شرکت رخ داد.", "error");
    },
  });

  return {
    deleteCompanyMutation,
  };
};

export default useDelete;
