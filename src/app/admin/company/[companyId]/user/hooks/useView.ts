import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import userCompanyUrls from "@/utils/url/adminPanel/userCompany/userCompanyUrl";
import { useToast } from "@/hooks/ui/useToast";

export default function getUserCompanyList(companyID: number) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const getUserCompanyListMutation = useMutation({
    mutationKey: allQueryKeys.adminPanel.userCompany.list,
    retry: false,
    mutationFn: ({ company_id = companyID }: { company_id?: number; }) =>
      fetchWithError(
        userCompanyUrls.listUserCompany(company_id),
        { method: "GET" }
      ).then(sanitizer),
    onSuccess: (serverResponse) => {
      queryClient.setQueryData(allQueryKeys.adminPanel.userCompany.list, {
        access: serverResponse.data,
      });
    },
    onError: () => {
      showToast("خطایی رخ داد.", "error");
    },
  });

  return getUserCompanyListMutation;
}

const responseSchema = z.object({
  data: z.object({
    count: z.number(),
    next: z.nullable(z.string()), 
    previous: z.nullable(z.string()),
    results: z.array(
      z.object({
        id: z.number(),
        user: z.string(),
        company: z.string(),
        groups: z.array(z.object({
          id: z.number(),
          name: z.string(),
        })),
        permissions: z.array(z.object({
          id: z.number(),
          name: z.string(),
        })),
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
