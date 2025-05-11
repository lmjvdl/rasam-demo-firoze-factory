import Url from "../dataFetching/urls";

export default function concatImagePathAndBaseUrl(imagePath: string): string {
    const urlInstance = new Url();
    
    return `${urlInstance.origin}${
      String(imagePath).startsWith("/")
      ? String(imagePath).substring(1)
      : imagePath
    }`
}