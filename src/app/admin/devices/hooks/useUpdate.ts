import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import deviceUrls from "@/utils/URLs/adminPanel/device/deviceUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/UI/useToast";

export type DeviceUpdateSchema = {
  id: number;
  product_line_part: number;
  name: string;
  code: string;
};

const useUpdateDevice = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateDeviceMutation = useMutation({
    mutationFn: async ({ id, ...updatedData }: DeviceUpdateSchema) => {
      return fetchWithErrorWithAlarm(deviceUrls.editDevice(id), {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.devices.update });
    },
    onError: () => {
      showToast("خطایی در به‌روزرسانی دستگاه رخ داد.", "error");
    },
  });

  return {
    updateDeviceMutation,
  };
};

export default useUpdateDevice;
