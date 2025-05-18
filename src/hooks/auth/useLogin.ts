import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWithErrorWithAlarm } from "@/utils/dataFetching/fetchWithError";
import { deleteUser, updateUser } from "../context/authStore";
import { errorHandler } from "@/utils/dataFetching/queryClient";
import allQueryKeys from "@/utils/dataFetching/allQueryKeys";
import authUrls from "@/utils/contextDependencies/authUrls";
import AuthResponseSanitizer from "@/utils/contextDependencies/authResponseSanitizer";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationKey: allQueryKeys.login,
    retry: false,
    retryDelay: 0,
    mutationFn: (entry: { username: string; password: string }) =>
      fetchWithErrorWithAlarm(authUrls.login, {
        method: "POST",
        body: JSON.stringify(entry),
      }).then(AuthResponseSanitizer),
    onSuccess: (serverResponse) => {
      updateUser(serverResponse);
      queryClient.setQueryData(allQueryKeys.refreshToken, {
        access: serverResponse.data.accessToken,
      });
      router.push("/");
    },
    onError: () => {
      const prettyError = new Error("نام کاربری یا رمز عبور شما نامعتبر است.");
      toast.error("نام کاربری یا رمز عبور شما نامعتبر است.")
      prettyError.cause = "خطای احراز هویت";
      errorHandler(prettyError);
      deleteUser();
    },
  });

  return loginMutation;
}

