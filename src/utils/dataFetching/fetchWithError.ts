import { useAuthStore } from "@/hooks/context/authStore";
import toast from "react-hot-toast";

export default async function fetchWithError(
url: string | URL, options: RequestInit = {}, p?: number | undefined, page_size?: number | undefined) {
  try {
    const refinedOption = addProperHeader(options);
    const response = await window.fetch(url, refinedOption);
    if (!response.ok) {
      throw new Error("");
    }
    const result = await response.json();
    return result;
  } catch (err) {
    throw new Error("درخواست به سرور با مشکل مواجه شد.", {
      cause: "خطای سرور",
    });
  }
}


export async function fetchWithErrorWithAlarm(
  url: string | URL, options: RequestInit = {}, p?: number | undefined, page_size?: number | undefined) {
    try {
      const refinedOption = addProperHeader(options);
      const response = await window.fetch(url, refinedOption);
      if (!response.ok) {
        throw new Error("");
      }
      const result = await response.json();
      if (response.status === 200) {
        toast.success(result.messages || "✅ عملیات موفقیت‌آمیز بود");
        return result;
      } else if(response.status !== 200) {
        if (Array.isArray(result.messages)) {
          result.messages.forEach((messageObj: { [key: string]: { message: string[] } }) => {
            for (const [field, fieldMessages] of Object.entries(messageObj)) {
              if (Array.isArray(fieldMessages.message)) {
                fieldMessages.message.forEach((msg) => {
                  toast.error(`${field}: ${msg}`);
                });
              }
            }
          });
        } 
        throw new Error("درخواست به سرور با مشکل مواجه شد.");
      }
    } catch (err) {
      throw new Error("درخواست به سرور با مشکل مواجه شد.");
    }
  }
  


export async function fetchWithErrorForCreate(
  url: string | URL,
  options: RequestInit = {}
) {
  try {
    const refinedOption = addProperHeader(options);
    const response = await window.fetch(url, refinedOption);
    const rawData = await response.json();

    if (response.status === 200 || response.status === 201) {
      toast.success(rawData.messages || "✅ عملیات موفقیت‌آمیز بود");
      return rawData;
    } else {
      if (Array.isArray(rawData.messages)) {
        rawData.messages.forEach((messageObj: { [key: string]: { message: string[] } }) => {
          for (const [field, fieldMessages] of Object.entries(messageObj)) {
            if (Array.isArray(fieldMessages.message)) {
              fieldMessages.message.forEach((msg) => {
                toast.error(`${field}: ${msg}`);
              });
            }
          }
        });
      } else {
        toast.error(rawData.messages || "❌ خطایی رخ داده است");
      }
      throw new Error("درخواست به سرور با مشکل مواجه شد.");
    }
  } catch (err) {
    throw new Error("درخواست به سرور با مشکل مواجه شد.");
  }
}



export async function fetchWithErrorForDelete(
  url: string | URL,
  options: RequestInit = {}
) {
  try {
    const refinedOption = addProperHeader(options);
    const response = await window.fetch(url, refinedOption);
    const rawData = await response.json();

    if (response.status === 200 || response.status === 204) {
      toast.success(rawData.messages || "✅ عملیات موفقیت‌آمیز بود");
      return rawData;
    } else {
      if (Array.isArray(rawData.messages)) {
        rawData.messages.forEach((messageObj: { [key: string]: { message: string[] } }) => {
          for (const [field, fieldMessages] of Object.entries(messageObj)) {
            if (Array.isArray(fieldMessages.message)) {
              fieldMessages.message.forEach((msg) => {
                toast.error(`${field}: ${msg}`);
              });
            }
          }
        });
      } else {
        toast.error(rawData.messages || "❌ خطایی رخ داده است");
      }
      throw new Error("درخواست به سرور با مشکل مواجه شد.");
    }
  } catch (err) {
    throw new Error("درخواست به سرور با مشکل مواجه شد.");
  }
}



function addProperHeader(options: RequestInit) {
  const newOptions = options;
  const newHeaders = new Headers(options.headers);
  newHeaders.set("Content-Type", "application/json");
  if (useAuthStore.getState().isLoggedIn) {
    newHeaders.set(
      "Authorization",
      `Bearer ${useAuthStore.getState().accessToken}`
    );
  }
  newOptions.headers = newHeaders;
  return newOptions;
}