import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import smsLogUrls from "@/utils/url/adminPanel/smsLog/smsLog";
import gregorianToJalali from "@/utils/formatters/isoDateToSolarDate";

export default function getSmsLogList() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const getSmsLogListMutation = useMutation({
    mutationKey: allQueryKeys.adminPanel.smsLog.list,
    retry: false,
    mutationFn: ({ page, page_size, url }: { page?: number; page_size?: number; url: string | null; }) =>
      fetchWithError(
        url !== null ? url : 
        `${smsLogUrls.listSmsLog}?p=${page}&page_size=${page_size}`,
        { method: "GET" }
      ).then(sanitizer),
      onSuccess: (serverResponse) => {
      queryClient.setQueryData(allQueryKeys.adminPanel.smsLog.list, {
        access: serverResponse.data,
      });
    },
    onError: () => {
      showToast("خطایی رخ داد.", "error");
    },
  });

  return getSmsLogListMutation;
}

const responseSchema = z.object({
  data: z.object({
    count: z.number(),
    next: z.nullable(z.string()), 
    previous: z.nullable(z.string()),
    results: z.array(
      z.object({
        id: z.number(),
        to: z.string(),
        message: z.string(),
        status: z.string(),
        response: z.string(),
        created_at: z.string()
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

    const transformedResults = refinedData.data.results.map((item) => ({
      ...item,
      created_at: item.created_at ? gregorianToJalali(item.created_at) : "",
    }));

    return { ...refinedData, data: { ...refinedData.data, results: transformedResults } };
  } catch (err) {
    const errorMessage =
      err instanceof Error && err.message
        ? err.message
        : "متاسفانه داده دریافتی ناقص است لطفا دوباره تلاش نمایید.";
    throw new Error(errorMessage, { cause: "خطای سرور" });
  }
}
