import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import functionUrls from "@/utils/url/adminPanel/functionUrl";

export type FunctionUpdateSchema = {
  id: number;
  name: string;
  description: string;
};

const useUpdateFunction = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateFunctionMutation = useMutation({
    mutationFn: async ({ id, ...updatedData }: FunctionUpdateSchema) => {
      return fetchWithErrorWithAlarm(functionUrls.editFunction(id), {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.function.update });
    },
    onError: () => {
      showToast("❌ خطایی در به‌روزرسانی فانکشن رخ داد.", "error");
    },
  });

  return {
    updateFunctionMutation,
  };
};

export default useUpdateFunction;
