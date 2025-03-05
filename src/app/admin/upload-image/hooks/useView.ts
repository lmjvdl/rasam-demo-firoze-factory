import fetchWithError from "@/utils/dataFetching/fetchWithError";
import imageUploadUrls from "@/utils/URLs/adminPanel/imageUpload/imageUrl";

export const fetchIcons = async () => {
    try {
      const response = await fetchWithError(`${imageUploadUrls.listImageUpload}`);
      if (!response.ok) {
        throw new Error("خطا در دریافت لیست آیکون‌ها");
      }
      return await response.json();
    } catch (error) {
      console.log(error)
    }
  };