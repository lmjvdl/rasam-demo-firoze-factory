import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import productLineUrls from "@/utils/URLs/adminPanel/productLine/productLineUrl";
import { z } from "zod";

const productLineSchema = z.object({
  company: z.number().int("شرکت باید یک عدد صحیح باشد").min(1, "شرکت الزامی است"),
  name: z.string().min(1, "نام خط تولید الزامی است").max(30),
  code: z.string().min(1, "کد خط تولید الزامی است").max(15),
  icon: z.number().int("آیکن باید یک عدد صحیح باشد").nullable().optional(),
});

export const createNewProductLine = async (data: any) => {
  const dataWithCompanyAsNumber = {
    ...data,
    company: Number(data.company),
  };

  const validationResult = productLineSchema.safeParse(dataWithCompanyAsNumber);
  
  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
    icon: validationResult.data.icon !== undefined ? validationResult.data.icon : null,
  };

  try {
    const response = await fetchWithErrorForCreate(`${productLineUrls.createProductLine}`, {
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

