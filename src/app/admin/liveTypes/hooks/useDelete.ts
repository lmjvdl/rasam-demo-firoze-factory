import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import liveTypesUrls from "@/utils/url/adminPanel/liveTypesUrl";

const useDeleteLiveTypes = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteLiveTypesMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetchWithErrorForDelete(liveTypesUrls.deleteLiveTypes(id), {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.liveTypes.delete })
    },
    onError: () => {
      showToast("خطایی در حذف نوع زنده رخ داد.", "error");
    },
  });

  return {
    deleteLiveTypesMutation,
  };
};

export default useDeleteLiveTypes;
