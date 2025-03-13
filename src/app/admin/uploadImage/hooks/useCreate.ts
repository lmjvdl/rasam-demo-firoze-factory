import { uploadFileWithError } from "@/utils/dataFetching/fetchWithError";
import imageUploadUrls from "@/utils/url/adminPanel/imageUpload/imageUrl";

export const uploadIcon = async (file: File, name: string, theme: string) => {
  const formData = new FormData();
  formData.append("icon", file);
  formData.append("name", name);
  formData.append("theme", theme);

  return uploadFileWithError(imageUploadUrls.createImageUpload, formData);
};
