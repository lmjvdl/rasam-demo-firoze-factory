import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import functionParameterUrls from "@/utils/url/adminPanel/functionParameter/functionParameterUrl";
import { z } from "zod";

const functionParameterSchema = z.object({
  name: z.string().min(1).max(50),
  function: z.number(),
});

export const createNewFunctionParameter = async (data: unknown) => {
  const validationResult = functionParameterSchema.safeParse(data);
  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
    function: Number(validationResult.data.function)
  };

  try {
    const response = await fetchWithErrorForCreate(`${functionParameterUrls.createFunctionParameter}`, {
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
