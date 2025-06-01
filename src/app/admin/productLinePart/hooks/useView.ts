import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import productLinePartUrls from "@/utils/url/adminPanel/productLinePartUrl";
import { useToast } from "@/hooks/ui/useToast";

export default function useProductLinePartList(pages: number, pageSize: number, URL: string | null) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const getProductLinePartListMutation = useMutation({
    mutationKey: allQueryKeys.adminPanel.productLinePart.list,
    retry: false,
    mutationFn: ({ page = pages, page_size = pageSize, url = URL }: { page?: number; page_size?: number; url: string | null; }) =>
      fetchWithError(
        url !== null ? url : 
        `${productLinePartUrls.listProductLinePart}?p=${page}&page_size=${page_size}`,
        { method: "GET" }
      ).then(sanitizer),
    onSuccess: (serverResponse) => {
      queryClient.setQueryData(allQueryKeys.adminPanel.productLinePart.list, {
        access: serverResponse.data,
      });
    },
    onError: () => {
      showToast("خطایی رخ داد.", "error");
    },
  });

  return getProductLinePartListMutation;
}

const responseSchema = z.object({
  data: z.object({
    count: z.number(),
    next: z.nullable(z.string()), 
    previous: z.nullable(z.string()),
    results: z.array(
      z.object({
        id: z.number(),
        product_line: z.object({
          id: z.number(),
          name: z.string(),
        }),
        name: z.string(),
        code: z.string(),
        light_icon: z.string(),
        dark_icon: z.string(),
        live_type: z.object({
          id: z.number(),
          name: z.string(),
        }).nullable(),
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
