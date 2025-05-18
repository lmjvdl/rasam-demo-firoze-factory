"use client"

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import { initialDataProductLine } from "@/utils/refinedData/userPanel/productLine/producLine";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import { listProductLineSanitizer } from "@/utils/refinedData/userPanel/productLine/listProductLineSanitizer";
import availableProductLinesUrls from "@/utils/url/userPanel/dynamicManagement/AvailableProductLinesUrl";
import { useProductLineStore, updateProductLines } from "@/hooks/context/productLineStore";
import { useAuthStore } from "@/hooks/context/authStore";

export const useFetchAndSyncProductLines = () => {
  const userId = useAuthStore((s) => s.id);
  const setLoading = useProductLineStore((s) => s.setLoading);

  const { data, isSuccess, isFetching } = useQuery({
    queryKey: allQueryKeys.userPanel.productLines.list,
    queryFn: ({ signal }) => fetchWithError(
      availableProductLinesUrls.ListOfAvailableProductLines(userId), { signal }
    ),
    select: listProductLineSanitizer,
    initialData: initialDataProductLine,
    enabled: !!userId,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess) {
      updateProductLines({
        companies: data.data,
        data: []
      });
    }
    setLoading(isFetching);
  }, [data, isSuccess, isFetching, setLoading]);
};
