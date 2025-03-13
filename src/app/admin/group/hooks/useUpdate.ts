import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import groupUrls from "@/utils/url/adminPanel/group/groupUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";

export type GroupUpdateSchema = {
  id: number;
  name: string;
  permissions: number[];
};

const useUpdateGroup = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateGroupMutation = useMutation({
    mutationFn: async ({ id, ...updatedData }: GroupUpdateSchema) => {
      return fetchWithErrorWithAlarm(groupUrls.editGroup(id), {
        method: "PUT",
        body: JSON.stringify(updatedData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.group.update });
    },
    onError: () => {
      showToast("خطایی در به‌روزرسانی گروه رخ داد.", "error");
    },
  });

  return {
    updateGroupMutation,
  };
};

export default useUpdateGroup;
