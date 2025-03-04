import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { useToast } from "@/hooks/UI/useToast";
import userUrls from "@/utils/URLs/adminPanel/user/userUrl";

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
      showToast("❌ خطایی رخ داد.", "error");
    },
  });

  return getCompanyListMutation;
}



const responseSchema = z.object({
    data: z.object({
      count: z.number(),
      next: z.nullable(z.string()),
      previous: z.nullable(z.string()),
      page_size: z.number(),
      results: z.array(
        z.object({
          id: z.number(),
          username: z.string(),
          profile_image: z.nullable(z.string()),
          phone_number: z.string(),
          email: z.string(),
          first_name: z.string(),
          national_code: z.nullable(z.string()),
          last_name: z.string(),
          groups: z.array(
            z.object({
              id: z.number(),
              name: z.string(),
              permissions: z.array(z.number()),
            })
          ),
          is_active: z.boolean(),
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
