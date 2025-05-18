// store/productLineStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductLineState } from "@/interfaces/general/general";

const initialProductLineStore: ProductLineState = {
  company_id: 0,
  company_name: "",
  company_logo: "",
  product_lines: [
    {
      id: 0,
      name: "",
      icon: null,
    },
  ],
};

export const useProductLineStore = create(
  persist<ProductLineState>(() => initialProductLineStore, {
    name: "productLine",
  })
);

export const updateProductLines = (productLineData: ProductLineState) => {
  useProductLineStore.setState(productLineData);
};
