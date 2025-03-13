// Login.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/login/login.css";
import { Button, Container, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import useLogin from "@/hooks/auth/useLogin";
import { deleteUser } from "@/hooks/context/authStore";
import Providers from "@/providers/Providers";
import { ToastProvider } from "@/components/notification/ToastProvider";

type FormData = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [error, setError] = useState("");
  const loginMutation = useLogin();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    loginMutation.mutate(data, {});
    deleteUser();
  };

  return (
    <Providers>
      <ToastProvider />
      <div className="login-page">
        <div className="login-card-wrap">
          <div className="login-card">
            <Container className="form-container">
              <Image
                className="logo"
                src="/logo/logo512.png"
                alt="rasam-logo"
                width={1000}
                height={1000}
              />
              <div className="text-container">
                <Typography className="typing-text">
                  ورود به سامانه مانیتورینگ هوشمند رسام
                </Typography>
              </div>
              {error && <p className="error-text">{error}</p>}
              <form onSubmit={handleSubmit(onSubmit)} className="form-hook">
                <div className="form__group field">
                  <TextField
                    label="نام کاربری"
                    variant="outlined"
                    className="form__field"
                    {...register("username", {
                      required: "نام کاربری ضروری است",
                    })}
                    error={!!errors.username}
                    helperText={errors.username ? errors.username.message : ""}
                  />
                </div>
                <div className="form__group field">
                  <TextField
                    label="رمز عبور"
                    variant="outlined"
                    type="password"
                    className="form__field"
                    {...register("password", {
                      required: "رمز عبور ضروری است",
                    })}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ""}
                  />
                </div>
                <Button type="submit" className="login-button">
                  ورود
                </Button>
              </form>
            </Container>
          </div>
        </div>
      </div>
    </Providers>
  );
}
