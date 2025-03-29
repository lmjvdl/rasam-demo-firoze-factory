import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import userUrls from "@/utils/url/adminPanel/user/userUrl";
import { z } from "zod";

const userSchema = z.object({
  username: z.string(),
  email: z.string(),
  phone_number: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  password: z.string(),
  national_code: z.string(),
  is_manager: z.boolean().default(false),
  is_superuser: z.boolean().default(false),
  is_admin: z.boolean().default(false),
});

export const createNewUser = async (data: unknown) => {
  const validationResult = userSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data
  };

  try {
    const response = await fetchWithErrorForCreate(`${userUrls.createUser}`, {
      method: "POST",
      body: JSON.stringify(processedData),
    });

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
