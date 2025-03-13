import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import deviceDataUrls from "@/utils/url/adminPanel/deviceData/deviceDataUrl"; 
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";

const useDeleteDeviceData = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteDeviceDataMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetchWithErrorForDelete(deviceDataUrls.deleteDeviceData(id), {
        method: "DELETE",
      });
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.deviceData.delete });
    },
    onError: () => {
      showToast("خطایی در حذف داده دستگاه رخ داد.", "error");
    },
  });

  return {
    deleteDeviceDataMutation,
  };
};

export default useDeleteDeviceData;
