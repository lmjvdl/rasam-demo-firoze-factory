import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import inputItemsUrls from "@/utils/url/adminPanel/inputItemUrl";

export type InputItemUpdateSchema = {
  id: number;
  name: string;
  required: boolean;
};

const useUpdateInputItem = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateInputItemMutation = useMutation({
    mutationFn: async ({ id, ...updatedData }: InputItemUpdateSchema) => {
      return fetchWithErrorWithAlarm(inputItemsUrls.editInputItem(id), {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.inputItem.update });
    },
    onError: () => {
      showToast("❌ خطایی در به‌روزرسانی ورودی رخ داد.", "error");
    },
  });

  return {
    updateInputItemMutation,
  };
};

export default useUpdateInputItem;
