import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import dataTypeUrls from "@/utils/url/adminPanel/dataTypeUrl";

const useDeleteDataType = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteDataTypeMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetchWithErrorForDelete(dataTypeUrls.deleteDataType(id), {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: allQueryKeys.adminPanel.dataType.delete,
      }); // تغییر کلید query به کلید مربوط به data type
    },
    onError: () => {
      showToast("خطایی در حذف نوع داده رخ داد.", "error");
    },
  });

  return {
    deleteDataTypeMutation,
  };
};

export default useDeleteDataType;
