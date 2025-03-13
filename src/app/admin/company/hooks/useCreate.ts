import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import companyUrls from "@/utils/url/adminPanel/company/companyUrl";
import { z } from "zod";

const companySchema = z.object({
  name: z.string().min(1, "نام شرکت الزامی است"),
  description: z.string().optional(),
  code: z.string().min(1, "کد شرکت الزامی است"),
  logo: z.number().nullable(),
});

export const createNewCompany = async (data: unknown) => {
  const validationResult = companySchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
    description: validationResult.data.description === "" ? null : validationResult.data.description
  };

  try {
    const response = await fetchWithErrorForCreate(`${companyUrls.createCompany}`, {
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
