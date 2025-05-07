import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import contactsUrls from "@/utils/url/adminPanel/contactUrl";

export type ContactsUpdateSchema = {
  id: number;
  name: string;
  phone_number: string;
};

const useUpdateContacts = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateContactsMutation = useMutation({
    mutationFn: async ({ id, ...updatedData }: ContactsUpdateSchema) => {
      return fetchWithErrorWithAlarm(contactsUrls.editContacts(id), {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.contacts.update });
    },
    onError: () => {
      showToast("خطایی در به‌روزرسانی مخاطب رخ داد.", "error");
    },
  });

  return {
    updateContactsMutation,
  };
};

export default useUpdateContacts;
