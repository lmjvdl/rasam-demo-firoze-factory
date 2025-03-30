import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import userCompanyUrls from "@/utils/url/adminPanel/userCompany/userCompanyUrl";
import { useToast } from "@/hooks/ui/useToast";
import { extractIds } from "@/utils/formatters/extractId";

export type UserCompanyUpdateSchema = {
  id: number;
  company: string;
  groups: { id: number; name: string }[];
  permissions: { id: number; name: string }[];
};

const useUpdateUserCompany = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateUserCompanyMutation = useMutation({
    mutationFn: async ({ id, permissions, groups, ...updatedData }: UserCompanyUpdateSchema) => {
      return fetchWithErrorWithAlarm(userCompanyUrls.editUserCompany(id), {
        method: "PUT",
        body: JSON.stringify({
          ...updatedData, 
          permissions: extractIds(permissions), 
          groups: extractIds(groups)
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.userCompany.update });
    },
    onError: () => {
      showToast("خطایی در به‌روزرسانی کاربر شرکت رخ داد.", "error");
    },
  });

  return {
    updateUserCompanyMutation,
  };
};

export default useUpdateUserCompany;
