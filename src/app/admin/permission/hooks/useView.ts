import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import permissionUrls from "@/utils/url/adminPanel/permission/permission";

export default function getPermissionList() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const getPermissionListMutation = useMutation({
    mutationKey: allQueryKeys.adminPanel.permission.list,
    retry: false,
    mutationFn: ({ page, page_size, url }: { page?: number; page_size?: number; url: string | null; }) =>
      fetchWithError(
        url !== null ? url : 
        `${permissionUrls.listPermission}?p=${page}&page_size=${page_size}`,
        { method: "GET" }
      ).then(sanitizer),
      onSuccess: (serverResponse) => {
      queryClient.setQueryData(allQueryKeys.adminPanel.permission.list, {
        access: serverResponse.data,
      });
    },
    onError: () => {
      showToast("خطایی رخ داد.", "error");
    },
  });

  return getPermissionListMutation;
}

const responseSchema = z.object({
  data: z.object({
    count: z.number(),
    next: z.nullable(z.string()), 
    previous: z.nullable(z.string()),
    results: z.array(
      z.object({
        id: z.number(),
        name: z.string(),
        translate: z.string(),
      })
    ),
  }),
  status_code: z.number(),
  success: z.boolean(),
  messages: z.string(),
});

export type ResponseSchema = z.infer<typeof responseSchema>;

function sanitizer(pollutedData: unknown) {
  try {
    const refinedData = responseSchema.parse(pollutedData);
    return refinedData;
  } catch (err) {
    const errorMessage =
      err instanceof Error && err.message
        ? err.message
        : "متاسفانه داده دریافتی ناقص است لطفا دوباره تلاش نمایید.";
    throw new Error(errorMessage, { cause: "خطای سرور" });
  }
}
