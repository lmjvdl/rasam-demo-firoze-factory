export interface ProductLineResponse  {
  name: string;
  description?: string;
  id: number;
}
export type ProductLineParameter = Omit<ProductLineResponse, "id">;
