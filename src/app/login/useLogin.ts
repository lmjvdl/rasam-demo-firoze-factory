import { signIn } from "next-auth/react";
import { useState } from "react";

interface LoginResponse {
  success: boolean;
  message?: string;
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string): Promise<LoginResponse> => {
    setLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (result?.error) {
        setError(result.error);
        return { success: false, message: result.error };
      }

      return { success: true };
    } catch (err) {
      setError("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
      return { success: false, message: "خطایی رخ داد." };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
