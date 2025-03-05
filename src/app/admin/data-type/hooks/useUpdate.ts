import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import dataTypeUrls from "@/utils/URLs/adminPanel/dataType/dataTypeUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/UI/useToast";

export type DatatypeUpdateSchema = {
  id: number;
  name: string;
  json_field: string;
  description?: string;
};

const useUpdateDatatype = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateDatatypeMutation = useMutation({
    mutationFn: async ({ id, ...updatedData }: DatatypeUpdateSchema) => {
      return fetchWithErrorWithAlarm(dataTypeUrls.editDataType(id), {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.dataType.update });
    },
    onError: () => {
      showToast("❌ خطایی در به‌روزرسانی نوع داده رخ داد.", "error");
    },
  });

  return {
    updateDatatypeMutation,
  };
};

export default useUpdateDatatype;
