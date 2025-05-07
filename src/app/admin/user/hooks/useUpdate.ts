import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import userUrls from "@/utils/url/adminPanel/userUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";

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

  const updateUserMutation = useMutation({
    mutationFn: async ({ id, ...updatedData }: UserUpdateSchema) => {
      return fetchWithErrorWithAlarm(userUrls.editUser(id), {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.user.update });
    },
  });

  return {
    updateUserMutation,
  };
};

export { useUpdate };