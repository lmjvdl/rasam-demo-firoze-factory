import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import groupUrls from "@/utils/url/adminPanel/group/groupUrl";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import { extractIds } from "@/utils/formatters/extractId";

export type GroupUpdateSchema = {
  id: number;
  name: string;
  permissions: { id: number; name: string }[];
};

const useUpdateGroup = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const updateGroupMutation = useMutation({
    mutationFn: async ({ id, permissions, ...updatedData }: GroupUpdateSchema) => {
      return fetchWithErrorWithAlarm(groupUrls.editGroup(id), {
        method: "PUT",
        body: JSON.stringify({...updatedData, permissions: extractIds(permissions)}),
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