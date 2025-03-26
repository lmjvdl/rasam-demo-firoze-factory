import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import functionParameterUrls from "@/utils/url/adminPanel/functionParameter/functionParameterUrl";

export type FunctionParameterUpdateSchema = {
  id: number;
  name: string;
  function: number;
};

const useUpdateFunctionParameter = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateFunctionParameterMutation = useMutation({
    mutationFn: async ({ id, ...updatedData }: FunctionParameterUpdateSchema) => {
      return fetchWithErrorWithAlarm(functionParameterUrls.editFunctionParameter(id), {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.functionParameter.update });
    },
    onError: () => {
      showToast("❌ خطایی در به‌روزرسانی پارامتر فانکشن رخ داد.", "error");
    },
  });

  return {
    updateFunctionParameterMutation,
  };
};

export default useUpdateFunctionParameter;
