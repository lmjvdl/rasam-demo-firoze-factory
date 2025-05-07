import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import productLineUrls from "@/utils/url/adminPanel/productLineUrl";
import { z } from "zod";

const productLineSchema = z.object({
  company_info: z.number(),
  name: z.string(),
  code: z.string(),
  icon: z.number().nullable().optional(),
});

export const createNewProductLine = async (data: any) => {
  const dataWithCompanyAsNumber = {
    ...data,
    company_info: Number(data.company_info),
  };

  const validationResult = productLineSchema.safeParse(dataWithCompanyAsNumber);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
    icon:
      validationResult.data.icon !== undefined
        ? validationResult.data.icon
        : null,
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
