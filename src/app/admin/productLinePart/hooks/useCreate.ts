import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import productLinePartUrls from "@/utils/url/adminPanel/productLinePartUrl";
import toast from "react-hot-toast";
import { z } from "zod";

const productLinePartSchema = z.object({
  product_line: z.number(),
  name: z.string(),
  code: z.string(),
  DarkIcon: z.string().nullable().optional(),
  LightIcon: z.string().nullable().optional(),
  live_type: z.number(),
});

export const createNewProductLinePart = async (data: unknown) => {
  const validationResult = productLinePartSchema.safeParse(data);
  
  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
    DarkIcon:
      validationResult.data.DarkIcon !== undefined
        ? Number(validationResult.data.DarkIcon)
        : null,
    LightIcon:
      validationResult.data.LightIcon !== undefined
        ? Number(validationResult.data.LightIcon)
        : null,
    product_line_info: validationResult.data.product_line 
  };

  try {
    const response = await fetchWithErrorForCreate(
      `${productLinePartUrls.createProductLinePart}`,
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