import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import userUrls from "@/utils/url/adminPanel/user/userUrl";

const useDelete = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetchWithErrorForDelete(userUrls.deleteUser(id), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_active: false }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: allQueryKeys.adminPanel.company.delete,
      });
    },
    onError: () => {
      showToast("خطایی در غیرفعال‌سازی کاربر رخ داد.", "error");
    },
  });

  return {
    deleteUserMutation,
  };
};

export default useDelete;
