import axios from 'axios';
import { z } from 'zod';
import { BASE_URL } from './baseURL';

const baseResponseSchema = z.object({
  data: z.any(),
  status_code: z.number(),
  success: z.boolean(),
  messages: z.string(),
});

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const postRequest = async (
  endpoint: string,
  requestData: unknown,
  dataSchema: z.ZodSchema<any>
): Promise<any> => {
  try {
    const response = await api.post(endpoint, requestData);
    
    const parsedResponse = baseResponseSchema.safeParse(response.data);
    if (!parsedResponse.success) {
      throw new Error('Response structure is invalid');
    }
    
    const dataValidation = dataSchema.safeParse(parsedResponse.data.data);
    if (!dataValidation.success) {
      throw new Error('اطلاعات دریافتی از سمت سرور ناقص است.');
    }
    
    return parsedResponse.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.messages || 'خطای ناشناخته‌ای رخ داده است';
      throw new Error(errorMessage);
    }
    throw new Error('مشکلی در ارسال درخواست رخ داده است.');
  }
};

export { postRequest, z };
