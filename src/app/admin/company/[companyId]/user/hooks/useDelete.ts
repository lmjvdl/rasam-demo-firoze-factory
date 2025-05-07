import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import userCompanyUrls from "@/utils/url/adminPanel/userCompanyUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";

const useDelete = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteUserCompanyMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetchWithErrorForDelete(userCompanyUrls.deleteUserCompany(id), {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: allQueryKeys.adminPanel.userCompany.delete,
      });
    },
    onError: () => {
      showToast("خطایی در حذف کاربر در شرکت رخ داد.", "error");
    },
  });

  return {
    deleteUserCompanyMutation,
  };
};

export default useDelete;
