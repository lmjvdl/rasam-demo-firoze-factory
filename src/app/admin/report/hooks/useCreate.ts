import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import reportUrls from "@/utils/url/adminPanel/reportUrl";
import { z } from "zod";

const reportSchema = z.object({
  name: z.string(),
  input_items: z.number().array(),
  ouput_item: z.number(),
  intervals: z.number().array(),
  api_func: z.string(),
  product_line_part: z.number()
});

export const createNewReport = async (data: unknown) => {
  const validationResult = reportSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
  };

  try {
    const response = await fetchWithErrorForCreate(
      `${reportUrls.createReport}`,
      {
        method: "POST",
        body: JSON.stringify(processedData),
      }
    );

    if (response.status_code === 201 && response.success) {
      return { success: true, data: response.data };
    } else {
      return {
        success: false,
        error: response.messages || "خطایی رخ داده است",
      };
    }
  } catch {
    throw new Error("درخواست به سرور با مشکل مواجه شد.");
  }
};
