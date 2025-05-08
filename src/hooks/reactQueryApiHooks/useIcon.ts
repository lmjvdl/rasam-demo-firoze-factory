import { useQuery } from "@tanstack/react-query";
import { fetchWithErrorWithoutPagination } from "@/utils/dataFetching/fetchWithError";
import { z } from "zod";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import imageUploadUrls from "@/utils/url/adminPanel/imageUrl";

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
        name: z.string()
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

export default function useIcons() {

  const { data, error, isLoading } = useQuery({
    queryKey: allQueryKeys.adminPanel.icons.list, 
    queryFn: async () => {
      const response = await fetchWithErrorWithoutPagination(
        `${imageUploadUrls.listImageUpload}`,
        { method: "GET" }
      );
      return sanitizer(response);
    },
  });

  if (isLoading) {
    return { icons: [], loading: true };
  }

  if (error || !data) {
    return { icons: [], loading: false };
  }

  const icons = data.data.results.map((item: { id: number; icon: string; name: string }) => ({
    id: item.id,
    url: item.icon,
    name: item.name
  }));

  return { icons, loading: false };
}

