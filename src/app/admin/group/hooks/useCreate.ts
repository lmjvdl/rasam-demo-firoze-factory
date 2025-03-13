import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import groupUrls from "@/utils/url/adminPanel/group/groupUrl";
import { z } from "zod";

const groupSchema = z.object({
  name: z.string(),
  permissions: z.array(z.number().int("مجوزها باید به صورت اعداد صحیح باشند")),
  users: z.array(z.number()).optional(),
});

export const createNewGroup = async (data: unknown) => {
  const validationResult = groupSchema.safeParse(data);
  if (!validationResult.success) {
    return { success: false, error: validationResult.error.errors?.join(", ") };
  }
  
  const processedData = {
    ...validationResult.data,
  };

  try {
    const response = await fetchWithErrorForCreate(`${groupUrls.createGroup}`, {
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
