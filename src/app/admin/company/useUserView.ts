import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import { errorHandler } from "@/utils/dataFetching/queryClient";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import companyUrls from "@/utils/URLs/adminPanel/company/companyURL";
import gregorianToJalali from "@/utils/formatters/IsoDateToSolarDate";

// Updated function to handle GET requests
export default function getCompanyList(p?: number, page_size?: number) {
  const queryClient = useQueryClient();
  

  const getCompanyListMutation = useMutation({
    mutationKey: allQueryKeys.adminPanel.company.userListCompany,
    retry: false,
    mutationFn: async (companyId: number) =>
      fetchWithError(companyUrls.usersViewCompany(companyId), {
        method: "GET",
      }, p, page_size).then(sanitizer),
    onSuccess: (serverResponse) => {
      queryClient.setQueryData(allQueryKeys.adminPanel.company.userListCompany, {
        access: serverResponse.data,
      });
    },
    onError: () => {
      const prettyError = new Error("درخواست شما رد شد.");
      prettyError.cause = "خطا ";
      errorHandler(prettyError);
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
        user: z.number(),
        groups: z.array(z.object({
        })),
        permissions: z.array(z.object({
        })),
        created_at: z.string(), 
        updated_at: z.string().nullable(),
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
