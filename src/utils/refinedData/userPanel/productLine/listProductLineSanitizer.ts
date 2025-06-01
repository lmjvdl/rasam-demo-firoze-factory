import { ProductLineState } from "@/interfaces/user/general/general";
import { productLineDataArray } from "./producLine";

export function listProductLineSanitizer(rawData: unknown): ProductLineState {
    const serverSchema = productLineDataArray.safeParse(rawData);
    return {
      companies: serverSchema.success ? serverSchema.data.data : [],
      data: serverSchema.data?.data ? serverSchema.data.data : []
    };
  }
  