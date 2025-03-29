import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import productLinePartUrls from "@/utils/url/adminPanel/productLinePart/productLinePartUrl";
import { z } from "zod";

const productLinePartSchema = z.object({
  product_line: z.number(),
  name: z.string(),
  code: z.string(),
  icon: z.number().nullable().optional(),
});

export const createNewProductLinePart = async (data: any) => {
  const dataWithProductLineAsNumber = {
    ...data,
    product_line: Number(data.product_line),
  };
  const validationResult = productLinePartSchema.safeParse(
    dataWithProductLineAsNumber
  );

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
