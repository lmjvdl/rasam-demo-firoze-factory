import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import deviceUrls from "@/utils/url/adminPanel/deviceUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import { extractId, extractIds } from "@/utils/formatters/extractId";

export type DeviceUpdateSchema = {
  id: number;
  product_line_part: { id: number; name: string };
  data_type: { id: number; name: string }[];
  name: string;
  code: string;
  value: number;
  on_off_identifier: { id: number; name: string };
};

const useUpdateDevice = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateDeviceMutation = useMutation({
    mutationFn: async ({ id, on_off_identifier, product_line_part, data_type, ...updatedData }: DeviceUpdateSchema) => {
      return fetchWithErrorWithAlarm(deviceUrls.editDevice(id), {
        method: "PUT",
        body: JSON.stringify({
          ...updatedData, 
          on_off_identifier: extractId(on_off_identifier),
          data_type: extractIds(data_type),
          product_line_part: extractId(product_line_part)
        }),
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
