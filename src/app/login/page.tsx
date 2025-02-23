"use client"

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Container, TextField, Typography } from "@mui/material";
import Image from "next/image";
import "../../styles/login/login.css";
import { useLogin } from "./useLogin";

interface FormData {
  username: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { login } = useLogin();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await login(data.username, data.password);
      window.location.href = "/dashboard";
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "ورود ناموفق بود. لطفاً اطلاعات را بررسی کنید.";
      alert(errorMessage);
    }
  };

  return (
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

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form__group field">
                <TextField
                  id="username"
                  label="نام کاربری"
                  variant="outlined"
                  className="form__field"
                  {...register("username", { required: "نام کاربری الزامی است" })}
                  error={!!errors.username}
                  helperText={errors.username?.message?.toString() ?? ""}
                />
              </div>
              <div className="form__group field">
                <TextField
                  id="password"
                  label="رمز عبور"
                  variant="outlined"
                  type="password"
                  className="form__field"
                  {...register("password", { required: "رمز عبور الزامی است" })}
                  error={!!errors.password}
                  helperText={errors.password?.message?.toString() ?? ""}
                />
              </div>
              <div>
                <Button
                  type="submit"
                  className="login-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "در حال ورود..." : "ورود"}
                </Button>
              </div>
            </form>
          </Container>
        </div>
      </div>
    </div>
  );
}
