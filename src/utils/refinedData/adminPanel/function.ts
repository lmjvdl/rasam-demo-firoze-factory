import { initialData } from "./initialData/initialData";
import { arrayOfData } from "./initialData/arrayOfItem";

export function functionSanitizer(rawData: unknown) {
  const serverSchema = arrayOfData.safeParse(rawData);
  return serverSchema.success ? serverSchema.data.data.results : initialData.data.results;
}

