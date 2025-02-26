import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import companyUrls from "@/utils/URLs/adminPanel/company/companyURL";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";

const useDelete = () => {
  const queryClient = useQueryClient();

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
      alert("خطایی در حذف شرکت رخ داد.");
    },
  });

  return {
    deleteCompanyMutation,
  };
};

export default useDelete;
