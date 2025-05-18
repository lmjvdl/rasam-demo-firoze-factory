import { useQuery } from "@tanstack/react-query";
import fetchWithError from "@/utils/dataFetching/fetchWithError";
import { errorHandler } from "@/utils/dataFetching/queryClient";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import authUrls from "@/utils/contextDependencies/authUrls";
import { deleteUser, renewAccessToken, useAuthStore } from "../context/authStore";
import toast from "react-hot-toast";

const LESS_THAN_5_MINUTES = 1000 * 60 * 4.5;

export default function useTokenRotation() {
  const [isLoggedIn, refreshToken] = useAuthStore((state) => [
    state.isLoggedIn,
    state.refreshToken,
  ]);

  const accessTokenQuery = useQuery({
    queryKey: allQueryKeys.refreshToken,
    enabled: isLoggedIn,
    refetchInterval: LESS_THAN_5_MINUTES,
    staleTime: LESS_THAN_5_MINUTES,
    retry: false,
    refetchIntervalInBackground: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    queryFn: async ({ signal }) => {
      try {
        const response = await fetchWithError(authUrls.refreshToken, {
          method: "POST",
          body: JSON.stringify({ refresh: refreshToken }),
          signal,
        });
        renewAccessToken(response.access);
        return response;
      } catch (error) {
        toast.error("خطای احراز هویت. لطفا دوباره وارد شوید.")
        const prettyError = new Error("لطفا دوباره وارد شوید.");
        prettyError.cause = "خطای احراز هویت";
        errorHandler(prettyError);
        deleteUser();
        throw error;
      }
    },
  });

  return accessTokenQuery;
}