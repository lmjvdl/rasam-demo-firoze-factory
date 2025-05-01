import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import contactsUrls from "@/utils/url/adminPanel/contacts/contactUrls";
import { listSanitizer } from "@/utils/refinedData/adminPanel/listSanitizer";
import { initialData } from "@/utils/refinedData/adminPanel/initialData/initialData";

export default function useContactsQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.alarm.contacts_list,
    initialData: initialData,
    select: listSanitizer,
    queryFn: ({ signal }) => fetchWithError(contactsUrls.listContacts, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}