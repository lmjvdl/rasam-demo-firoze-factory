import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import outputItemUrls from "@/utils/url/adminPanel/outputItemUrl";
import { useToast } from "@/hooks/ui/useToast";

export type OutputItemUpdateSchema = {
  id: number;
  name: string;
};

const useUpdateOutputItem = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateOutputItemMutation = useMutation({
    mutationFn: async ({ id, ...updatedData }: OutputItemUpdateSchema) => {
      return fetchWithErrorWithAlarm(outputItemUrls.editOutputItem(id), {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.outputItem.update });
    },
    onError: () => {
      showToast("❌ خطایی در به‌روزرسانی آیتم خروجی رخ داد.", "error");
    },
  });

  return {
    updateOutputItemMutation,
  };
};

export default useUpdateOutputItem;
