import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductLineState } from "@/interfaces/general/general";

const initialProductLineStore: ProductLineState = {
  companies: [],
  data: []
};
export interface ProductLineStoreState extends ProductLineState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useProductLineStore = create(
  persist<ProductLineStoreState>(
    (set) => ({
      ...initialProductLineStore,
      loading: true,
      setLoading: (loading) => set({ loading }),
    }),
    { name: "productLine" }
  )
);

export const updateProductLines = (productLineData: ProductLineState) => {
  useProductLineStore.setState(productLineData);
};
