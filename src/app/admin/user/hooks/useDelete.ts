import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/UI/useToast";
import userUrls from "@/utils/URLs/adminPanel/user/userUrl";

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
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.company.delete });
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