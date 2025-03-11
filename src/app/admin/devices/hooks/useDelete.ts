import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import deviceUrls from "@/utils/URLs/adminPanel/device/deviceUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/UI/useToast";

const useDeleteDevice = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteDeviceMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetchWithErrorForDelete(deviceUrls.deleteDevice(id), {
        method: "DELETE",
      });
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.devices.delete })
    },
    onError: () => {
      showToast("خطایی در حذف دستگاه رخ داد.", "error");
    },
  });

  return {
    deleteDeviceMutation,
  };
};

export default useDeleteDevice;
