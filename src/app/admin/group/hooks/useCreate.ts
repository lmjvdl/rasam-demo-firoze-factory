import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import groupUrls from "@/utils/URLs/adminPanel/group/groupUrl";
import { z } from "zod";

const groupSchema = z.object({
  name: z.string().min(1, "نام گروه الزامی است").max(150),
  permissions: z.array(z.number().int("مجوزها باید به صورت اعداد صحیح باشند")),
  users: z.array(z.string()).optional(),
});

export const createNewGroup = async (data: unknown) => {
  const validationResult = groupSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  try {
    const response = await fetchWithErrorForCreate(`${groupUrls.createGroup}`, {
      method: "POST",
      body: JSON.stringify(validationResult),
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
