import { fetchWithErrorForCreate } from "@/utils/dataFetching/fetchWithError";
import contactsUrls from "@/utils/url/adminPanel/contacts/contactUrls";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

const contactsSchema = z.object({
  name: z.string(),
  phone_number: z.string(),
});

export const createNewContact = async (data: unknown) => {
  const validationResult = contactsSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, error: validationResult.error.format() };
  }

  try {
    const response = await fetchWithErrorForCreate(
      contactsUrls.createContacts,
      {
        method: "POST",
        body: JSON.stringify(validationResult.data),
      }
    );

    if (response.status_code === 201) {
      return { 
        success: true, 
        data: response.data,
        messages: response.messages 
      };
    }
    return {
      success: false,
      error: response.messages || "خطایی رخ داده است",
    };
  } catch {
    throw new Error("درخواست به سرور با مشکل مواجه شد.");
  }
};

export const useCreateContact = () => {
  return useMutation({
    mutationFn: (data: unknown) => createNewContact(data),
  });
};
