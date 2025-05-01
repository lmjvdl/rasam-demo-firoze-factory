import { arrayOfData } from "./initialData/arrayOfItem";
import { initialData } from "./initialData/initialData";

export function listSanitizer(rawData: unknown) {
    const serverSchema = arrayOfData.safeParse(rawData);
    return serverSchema.success ? serverSchema.data.data.results : initialData.data.results;
}
  