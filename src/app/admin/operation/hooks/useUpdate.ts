import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import operationUrls from "@/utils/url/adminPanel/operationUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import { extractId, extractIds } from "@/utils/formatters/extractId";

export type OperationUpdateSchema = {
  id: number;
  device: { id: number; name: string };
  devices: { id: number; name: string }[];
  operation: string;
};

const useUpdateOperation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateOperationMutation = useMutation({
    mutationFn: async ({ id, devices, device,...updatedData }: OperationUpdateSchema) => {
      return fetchWithErrorWithAlarm(operationUrls.editOperation(id), {
        method: "PUT",
        body: JSON.stringify({...updatedData, devices: extractIds(devices), device: extractId(device)}),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.operation.update });
    },
    onError: () => {
      showToast("خطایی در به‌روزرسانی گروه رخ داد.", "error");
    },
  });

  return {
    updateOperationMutation,
  };
};

export default useUpdateOperation;