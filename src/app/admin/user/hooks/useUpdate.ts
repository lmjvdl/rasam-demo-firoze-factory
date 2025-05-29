import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import userUrls from "@/utils/url/adminPanel/userUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { extractIds } from "@/utils/formatters/extractId";

export type UserUpdateSchema = {
    id: number;
    phone_number: string;
    email: string;
    password?: string;
    first_name: string;
    last_name: string;
    groups: { id: number; name: string }[];
    product_lines: { id: number; name: string; }[];
  };
  

const useUpdate = () => {
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: async ({ id, groups, product_lines, ...updatedData }: UserUpdateSchema) => {
      return fetchWithErrorWithAlarm(userUrls.editUser(id), {
        method: "PUT",
        body: JSON.stringify({
          ...updatedData,
          product_lines: extractIds(product_lines),
          groups: extractIds(groups)
        }),
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