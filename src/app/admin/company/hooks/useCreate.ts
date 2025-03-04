import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import companyUrls from "@/utils/URLs/adminPanel/company/companyURL";
import { z } from "zod";

const companySchema = z.object({
  name: z.string().min(1, "نام شرکت الزامی است"),
  description: z.string().optional(),
  code: z.string().min(1, "کد شرکت الزامی است"),
  logo: z.string().nullable(),
});

export const createNewCompany = async (data: unknown) => {
  const validationResult = companySchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
    logo: validationResult.data.logo === "" ? null : validationResult.data.logo,
    description: validationResult.data.description === "" ? null : validationResult.data.description
  };

  try {
    const response = await fetchWithErrorForCreate(`${companyUrls.createCompany}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
