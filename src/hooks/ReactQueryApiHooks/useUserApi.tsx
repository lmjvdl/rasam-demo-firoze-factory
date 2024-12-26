import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RegisterUserParameter } from "@/interfaces/users";
import { axiosInstance } from "@/api/api";

const registerUserURL = "accounts/register/";
export const registerUser = (userData: RegisterUserParameter) => {
  return axiosInstance.post(registerUserURL, userData);
};

export const usersKey='users'
export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: registerUser,
    mutationKey: ["registerUser"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [usersKey] });
    },
  });

  return mutation;
};
