import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorForDelete } from "@/utils/dataFetching/fetchWithError";
import groupUrls from "@/utils/URLs/adminPanel/group/groupUrl"; // تغییر URL به URL مخصوص group
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/UI/useToast";

const useDeleteGroup = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const deleteGroupMutation = useMutation({
    mutationFn: async (id: number) => {
      return fetchWithErrorForDelete(groupUrls.deleteGroup(id), {
        method: "DELETE",
      });
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: allQueryKeys.adminPanel.group.delete }); // تغییر کلید query به کلید مربوط به group
    },
    onError: () => {
      showToast("❌ خطایی در حذف گروه رخ داد.", "error");
    },
  });

  return {
    deleteGroupMutation,
  };
};

export default useDeleteGroup;
