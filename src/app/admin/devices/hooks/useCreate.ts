import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import deviceUrls from "@/utils/url/adminPanel/device/deviceUrl";
import { z } from "zod";

const deviceSchema = z.object({
  product_line_part: z.number().int("قسمت خط تولید باید یک عدد صحیح باشد").min(1, "قسمت خط تولید الزامی است"),
  data_type: z.array(z.number()),
  name: z.string().min(1, "نام دستگاه الزامی است").max(30),
  code: z.string().min(1, "کد دستگاه الزامی است").max(15),
});

export const createNewDevice = async (data: unknown) => {
  const validationResult = deviceSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
  };

  try {
    const response = await fetchWithErrorForCreate(`${deviceUrls.createDevice}`, {
      method: "POST",
      body: JSON.stringify(processedData),
    });

    if (response.status_code === 201 && response.success) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.messages || "خطایی رخ داده است" };
    }
  } catch (error) {
    throw new Error("درخواست به سرور با مشکل مواجه شد.");
  }
};
