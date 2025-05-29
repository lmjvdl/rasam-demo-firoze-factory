import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import productLinePartUrls from "@/utils/url/adminPanel/productLinePartUrl";
import { z } from "zod";

const productLinePartSchema = z.object({
  product_line: z.string(),
  name: z.string(),
  code: z.string(),
  DarkIcon: z.number().nullable().optional(),
  LightIcon: z.number().nullable().optional(),
  live_type: z.string()
});

export const createNewProductLinePart = async (data: unknown) => {
  console.log(data)
  const validationResult = productLinePartSchema.safeParse(
    data
  );

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
    DarkIcon:
      validationResult.data.DarkIcon !== undefined
        ? validationResult.data.DarkIcon
        : null,
    LightIcon:
      validationResult.data.LightIcon !== undefined
        ? validationResult.data.LightIcon
        : null,
    live_type_info:  Number(validationResult.data.live_type),
    product_line_info:  Number(validationResult.data.product_line)
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
