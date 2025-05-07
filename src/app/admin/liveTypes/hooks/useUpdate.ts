import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import liveTypesUrls from "@/utils/url/adminPanel/liveTypesUrl";

export type LiveTypeUpdateSchema = {
  id: number;
  name: string;
};

const useUpdateLiveType = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateLiveTypeMutation = useMutation({
    mutationFn: async ({ id, ...updatedData }: LiveTypeUpdateSchema) => {
      return fetchWithErrorWithAlarm(liveTypesUrls.editLiveTypes(id), {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.liveTypes.update });
    },
    onError: () => {
      showToast("❌ خطایی در به‌روزرسانی نوع لایو رخ داد.", "error");
    },
  });

  return {
    updateLiveTypeMutation,
  };
};

export default useUpdateLiveType;
