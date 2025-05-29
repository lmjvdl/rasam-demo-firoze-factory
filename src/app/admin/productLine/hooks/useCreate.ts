import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import productLineUrls from "@/utils/url/adminPanel/productLineUrl";
import { z } from "zod";

const productLineSchema = z.object({
  company_info: z.number(),
  name: z.string(),
  code: z.string(),
  DarkIcon: z.number().nullable().optional(),
  LightIcon: z.number().nullable().optional(),
});

export const createNewProductLine = async (data: unknown) => {
  const validationResult = productLineSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
    dark_icon:
      validationResult.data.DarkIcon !== undefined
        ? validationResult.data.DarkIcon
        : null,
    LightIcon:
      validationResult.data.LightIcon !== undefined
        ? validationResult.data.LightIcon
        : null,
    company_info: Number(validationResult.data.company_info)
  };

  try {
    const response = await fetchWithErrorForCreate(
      `${productLineUrls.createProductLine}`,
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
