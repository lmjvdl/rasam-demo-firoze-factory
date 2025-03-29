import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import dataTypeUrls from "@/utils/url/adminPanel/dataType/dataTypeUrl";
import { z } from "zod";

const dataTypeSchema = z.object({
  name: z.string(),
  json_field: z.string(),
  description: z.string().nullable().optional(),
});

export const createNewDataType = async (data: unknown) => {
  const validationResult = dataTypeSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
    description:
      validationResult.data.description === ""
        ? null
        : validationResult.data.description,
  };

  try {
    const response = await fetchWithErrorForCreate(
      `${dataTypeUrls.createDataType}`,
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
