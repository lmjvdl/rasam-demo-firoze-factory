import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import userUrls from "@/utils/URLs/adminPanel/user/userUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/UI/useToast";

export type UserUpdateSchema = {
    id: number;
    phone_number: string;
    email: string;
    password?: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    groups?: { id: number; name: string; permissions: number[] }[];
  };
  

const useUpdate = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateUserMutation = useMutation({
    mutationFn: async ({ id, ...updatedData }: UserUpdateSchema) => {
      return fetchWithErrorWithAlarm(userUrls.editUser(id), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.user.update });
    },
    onError: () => {
      showToast("❌ خطایی در به‌روزرسانی کاربر رخ داد.", "error");
    },
  });

  return {
    updateUserMutation,
  };
};

export { useUpdate };