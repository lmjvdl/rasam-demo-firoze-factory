import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useToast } from "@/hooks/ui/useToast";
import uploadFileWithError from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import imageUploadUrls from "@/utils/url/adminPanel/imageUrl";

export default function getImageList(pages: number, pageSize: number, URL: string | null) {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const getImageListMutation = useMutation({
    mutationKey: allQueryKeys.adminPanel.icons.list,
    mutationFn: async ({ page = pages, page_size = pageSize, url = URL }: { page?: number; page_size?: number; url: string | null;}) => {
      return uploadFileWithError(url !== null ? url : `${imageUploadUrls.createImageUpload}?p=${page}&page_size=${page_size}`,  { method: "GET" }).then(sanitizer);
    },
    onSuccess: (serverResponse) => {
      queryClient.setQueryData(allQueryKeys.adminPanel.icons.list, {
        access: serverResponse.data,
      });
    },
    onError: () => {
      showToast("خطایی رخ داد.", "error");
    },
  });

  return getImageListMutation;
}

const responseSchema = z.object({
  data: z.object({
    count: z.number(),
    next: z.nullable(z.string()), 
    previous: z.nullable(z.string()),
    results: z.array(
      z.object({
        id: z.number(),
        icon: z.string(),
        uploaded_at: z.string(),
        name: z.string(),
        theme: z.string()
      })
    ),
  }),
  status_code: z.number(),
  success: z.boolean(),
  messages: z.string(),
});

export type ResponseSchema = z.infer<typeof responseSchema>;

function sanitizer(pollutedData: unknown): ResponseSchema {
  try {
    return responseSchema.parse(pollutedData);
  } catch (err) {
    const errorMessage =
      err instanceof Error && err.message
        ? err.message
        : "متاسفانه داده دریافتی ناقص است لطفا دوباره تلاش نمایید.";
    throw new Error(errorMessage, { cause: "خطای سرور" });
  }
}
