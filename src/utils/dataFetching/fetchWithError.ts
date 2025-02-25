import { useAuthStore } from "@/hooks/context/authStore";

export default async function fetchWithError(
  url: string | URL,
  options: RequestInit = {}
) {
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


export async function fetchWithErrorForCreate(
  url: string | URL,
  options: RequestInit = {}
) {
  try {
    const refinedOption = addProperHeader(options);
    const response = await window.fetch(url, refinedOption);
    if (response.status === 200 || response.status === 201) {
      const rawData = await response.json();
      return rawData;
    } else {
      throw new Error(`درخواست به سرور با مشکل مواجه شد.`);
    }
  } catch (err) {
    throw new Error("درخواست به سرور با مشکل مواجه شد.", {
      cause: "خطای سرور",
    });
  }
}