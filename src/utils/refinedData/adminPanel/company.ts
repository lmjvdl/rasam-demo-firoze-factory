import { arrayOfData } from "./initialData/arrayOfItem";
import { initialData } from "./initialData/initialData";

export function companySanitizer(rawData: unknown) {
  const serverSchema = arrayOfData.safeParse(rawData);
  return serverSchema.success ? serverSchema.data.data.results : initialData.data.results;
}

