import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import contactUrls from "@/utils/URLs/adminPanel/contact/contactUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";

export type ContactUpdateSchema = {
  id: number;
  year: number;
  month: number;
  time: string;
};

const useUpdateContact = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateContactMutation = useMutation({
    mutationFn: async ({ id, ...updatedData }: ContactUpdateSchema) => {
      return fetchWithErrorWithAlarm(contactUrls.editContact(id), {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.contact.update });
    },
    onError: () => {
      showToast("❌ خطایی در به‌روزرسانی تنظیمات شرکت رخ داد.", "error");
    },
  });

  return {
    updateContactMutation,
  };
};

export default useUpdateContact;
