import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import userUrls from "@/utils/url/adminPanel/userUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";

const useDelete = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetchWithErrorForDelete(userUrls.deleteUser(id), {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: allQueryKeys.adminPanel.user.delete,
      });
    },
    onError: () => {
      showToast("خطایی در حذف کاربر رخ داد.", "error");
    },
  });

  return {
    deleteUserMutation,
  };
};

export default useDelete;
