import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import contactsUrls from "@/utils/url/adminPanel/contactUrl";

const useDeleteContacts = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteContactsMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetchWithErrorForDelete(contactsUrls.deleteContacts(id), {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.contacts.delete })
    },
    onError: () => {
      showToast("خطایی در حذف مخاطب رخ داد.", "error");
    },
  });

  return {
    deleteContactsMutation,
  };
};

export default useDeleteContacts;
