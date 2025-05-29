import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/ui/useToast";
import userUrls from "@/utils/url/adminPanel/userUrl";

// Updated function to handle GET requests
export default function getUerList(pages: number, pageSize: number, URL: string | null) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const getCompanyListMutation = useMutation({
    mutationKey: allQueryKeys.adminPanel.user.list,
    retry: false,
    mutationFn: ({ page = pages, page_size = pageSize, url = URL }: { page?: number; page_size?: number; url: string | null; }) =>
      fetchWithError(
        url !== null ? url : 
        `${userUrls.listUser}?p=${page}&page_size=${page_size}`,
        { method: "GET" }
      ).then(sanitizer),
    onSuccess: (serverResponse) => {
      queryClient.setQueryData(allQueryKeys.adminPanel.user.list, {
        access: serverResponse.data,
      });
    },
    onError: () => {
      showToast("خطایی رخ داد.", "error");
    },
  });

  return getCompanyListMutation;
}



const responseSchema = z.object({
    data: z.object({
      count: z.number(),
      next: z.nullable(z.string()),
      previous: z.nullable(z.string()),
      results: z.array(
        z.object({
          id: z.number(),
          first_name: z.string(),
          last_name: z.string(),
          username: z.string(),
          phone_number: z.string(),
          email: z.string(),
          national_code: z.nullable(z.string()),
          groups: z.array(
            z.object({
              id: z.number(),
              name: z.string(),
            })
          ),
          product_lines: z.array(
            z.object({
              id: z.number(),
              name: z.string()
            }))
          })
      ),
    }),
    status_code: z.number(),
    success: z.boolean(),
    messages: z.string(),
  });

export type ResponseSchema = z.infer<typeof responseSchema>;

// Validate the response data and handle notifications
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
