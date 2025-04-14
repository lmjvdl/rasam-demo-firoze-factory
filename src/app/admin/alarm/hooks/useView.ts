import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import alarmUrls from "@/utils/url/adminPanel/alarm/alarmUrl";

export default function getAlarmList(pages: number, pageSize: number, URL: string | null) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const getAlarmListMutation = useMutation({
    mutationKey: allQueryKeys.adminPanel.alarm.list,
    retry: false,
    mutationFn: ({ page = pages, page_size = pageSize, url = URL }: { page?: number; page_size?: number; url: string | null; }) =>
      fetchWithError(
        url !== null ? url : 
        `${alarmUrls.listAlarm}?p=${page}&page_size=${page_size}`,
        { method: "GET" }
      ).then(sanitizer),
    onSuccess: (serverResponse) => {
      queryClient.setQueryData(allQueryKeys.adminPanel.alarm.list, {
        access: serverResponse.data,
      });
    },
    onError: () => {
      showToast("❌ خطایی رخ داد.", "error");
    },
  });

  return getAlarmListMutation;
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
        description: z.string(),
        message_type: z.string(),
        receiver_info: z.object({
          id: z.number(),
          name: z.string(),
        }).nullable(),
        message: z.string(),
        device_info: z.object({
          id: z.number(),
          name: z.string(),
        }),
        function_info: z.object({
          id: z.number(),
          name: z.string(),
        }),
        type_info: z.object({
          id: z.number(),
          name: z.string(),
        }),

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
      function: item.function_info ? item.function_info : { id: 0, name: "نامشخص" },
      device: item.device_info ? item.device_info : { id: 0, name: "نامشخص" },
      type: item.type_info ? item.type_info : { id: 0, name: "نامشخص" },
      receiver_info: item.receiver_info ? item.receiver_info : { id: 0, name: "نامشخص" },
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


