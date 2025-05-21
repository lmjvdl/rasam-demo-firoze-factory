// src/utils/api/adminPanel/operationSubmit.ts

import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import operationUrls from "@/utils/url/adminPanel/operationUrl";
import { z } from "zod";

const initialSubmitSchema = z.object({
  device_ids: z.array(z.number()),
});


export const createInitialSubmit = async (data: unknown) => {
  const validationResult = initialSubmitSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
  };

  try {
    const response = await fetchWithErrorForCreate(`${operationUrls.checkCommonDataType}`, {
      method: "POST",
      body: JSON.stringify(processedData),
    });

    if ((response.status_code === 201 || response.status_code === 200) && response.success) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.messages || "خطایی رخ داده است" };
    }
    
  } catch (error) {
    throw new Error("درخواست به سرور با مشکل مواجه شد.");
  }
};


const validOperations = ["sum", "avg"] as const;

const finalSubmitSchema = z.object({
  device: z.number().int(),
  devices: z.array(z.number().int()),
  datatype_operation: z.record(
    z.string(),
    z.enum(validOperations)
  )
});


export const createFinalSubmit = async (data: unknown) => {
  const validationResult = finalSubmitSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  const processedData = {
    ...validationResult.data,
  };

  try {
    const response = await fetchWithErrorForCreate(`${operationUrls.createOperation}`, {
      method: "POST",
      body: JSON.stringify(processedData),
    });

    if ((response.status_code === 201 || response.status_code === 200)&& response.success) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.messages || "خطایی رخ داده است" };
    }
  } catch (error) {
    throw new Error("درخواست به سرور با مشکل مواجه شد.");
  }
};
