import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import deviceUrls from "@/utils/url/adminPanel/device/deviceUrl";
import { z } from "zod";

const deviceSchema = z.object({
  product_line_part: z.number(),
  data_type: z.array(z.number()),
  name: z.string(),
  code: z.string(),
  on_off_identifier: z.number(),
  value: z.string(),
});

export const createNewDevice = async (data: unknown) => {
  const validationResult = deviceSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
    value: Number(validationResult.data.value),
  };

  try {
    const response = await fetchWithErrorForCreate(
      `${deviceUrls.createDevice}`,
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
