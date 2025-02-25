"use client";

import UnprotectedRoute from "@/components/routers/UnprotectedRoute";
import LoginForm from "./LoginPage";


export default function Login() {
  return (
    <UnprotectedRoute>
      <LoginForm />
    </UnprotectedRoute>
  );
}
