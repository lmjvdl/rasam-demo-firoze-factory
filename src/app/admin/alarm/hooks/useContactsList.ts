import { useQuery } from "@tanstack/react-query";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import contactsUrls from "@/utils/url/adminPanel/contacts/contactUrls";
import { contactsInitialData, contactsSanitizer } from "@/utils/refinedData/adminPanel/contacts";


export default function useContactsQuery() {
  return useQuery({
    queryKey: allQueryKeys.adminPanel.alarm.contacts_list,
    initialData: contactsInitialData,
    select: contactsSanitizer,
    queryFn: ({ signal }) => fetchWithError(contactsUrls.listContacts, { signal }),   
    retry: false,
    refetchIntervalInBackground: true,
  });
}