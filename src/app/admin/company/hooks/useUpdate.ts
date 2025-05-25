import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import companyUrls from "@/utils/url/adminPanel/companyUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";

export type CompanyUpdateSchema = {
  id: number;
  name: string;
  description: string;
  code: string;
  light_logo: string;
  dark_logo: string;
};

const useUpdate = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateCompanyMutation = useMutation({
    mutationFn: async ({ id, light_logo, dark_logo, ...updatedData }: CompanyUpdateSchema) => {
      return fetchWithErrorWithAlarm(companyUrls.editCompany(id), {
        method: "PUT",
        body: JSON.stringify({
          ...updatedData, 
          light_logo: light_logo === "" ? null : Number(light_logo),
          dark_logo: dark_logo === "" ? null : Number(dark_logo),
        }),
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
