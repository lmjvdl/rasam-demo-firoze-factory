import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import userCompanyUrls from "@/utils/url/adminPanel/userCompanyUrl";
import { z } from "zod";

const userCompanySchema = z.object({
  user: z.number(),
  company: z.string(),
  groups: z.array(z.number()),
  permissions: z.array(z.number()),
});

export const createNewUserCompany = async (data: unknown) => {
  const validationResult = userCompanySchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
    company: Number(validationResult.data.company),
  };

  try {
    const response = await fetchWithErrorForCreate(
      `${userCompanyUrls.createUserCompany}`,
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
