import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import contactsUrls from "@/utils/url/adminPanel/contactUrl";
import { extractIds } from "@/utils/formatters/extractId";

export type ContactsUpdateSchema = {
  id: number;
  name: string;
  phone_number: string;
  groups: { id: number; name: string }[];
  user_permissions: { id: number; name: string }[];
};

const useUpdateContacts = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateContactsMutation = useMutation({
    mutationFn: async ({ id, groups, user_permissions, ...updatedData }: ContactsUpdateSchema) => {
      return fetchWithErrorWithAlarm(contactsUrls.editContacts(id), {
        method: "PUT",
        body: JSON.stringify({
          ...updatedData,
          groups: extractIds(groups),
          user_permissions: extractIds(user_permissions)
        }),
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
