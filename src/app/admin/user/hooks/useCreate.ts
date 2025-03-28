import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import userUrls from "@/utils/url/adminPanel/user/userUrl";
import { z } from "zod";

const userSchema = z.object({
  username: z.string().min(1, "نام کاربری الزامی است").max(50),
  email: z.string().max(254),
  phone_number: z.string().min(1, "شماره موبایل الزامی است").max(11),
  first_name: z.string().max(150).optional(),
  last_name: z.string().max(150).optional(),
  password: z.string().min(1, "رمز عبور الزامی است").max(128),
  national_code: z.string().max(10).nullable().optional(),
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
    ...validationResult.data,
    national_code:
      validationResult.data.national_code === ""
        ? ""
        : validationResult.data.national_code,
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
