import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import companyUrls from "@/utils/url/adminPanel/company/companyUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";

export type CompanyUpdateSchema = {
  id: number;
  name: string;
  description: string;
  code: string;
  logo?: string;
};

const useUpdate = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateCompanyMutation = useMutation({
    mutationFn: async ({ id, logo, ...updatedData }: CompanyUpdateSchema) => {
      return fetchWithErrorWithAlarm(companyUrls.editCompany(id), {
        method: "PUT",
        body: JSON.stringify({...updatedData, logo: Number(logo)}),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.company.update });
    },
    onError: () => {
      showToast("خطایی در به‌روزرسانی شرکت رخ داد.", "error");
    },
  });

  return {
    updateCompanyMutation,
  };
};

export default useUpdate;
