import { uploadFileWithError } from "@/utils/dataFetching/fetchWithError";
import imageUploadUrls from "@/utils/URLs/adminPanel/imageUpload/imageUrl";

export const uploadIcon = async (file: File) => {
  return uploadFileWithError(`${imageUploadUrls.createImageUpload}`, file, "icon");
};