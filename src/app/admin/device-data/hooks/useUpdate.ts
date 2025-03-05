import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import deviceDataUrls from "@/utils/URLs/adminPanel/deviceData/deviceDataUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/UI/useToast";

export type DeviceDataUpdateSchema = {
  id: number;
  device: number;
  data_type: number[];
};

const useUpdateDeviceData = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateDeviceDataMutation = useMutation({
    mutationFn: async ({ id, ...updatedData }: DeviceDataUpdateSchema) => {
      return fetchWithErrorWithAlarm(deviceDataUrls.editDeviceData(id), {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.deviceData.update });
    },
    onError: () => {
      showToast("❌ خطایی در به‌روزرسانی داده دستگاه رخ داد.", "error");
    },
  });

  return {
    updateDeviceDataMutation,
  };
};

export default useUpdateDeviceData;
