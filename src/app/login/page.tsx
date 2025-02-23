"use client"
import React from "react";
import "../../styles/login/login.css";
import { Button, Container, TextField, Typography } from "@mui/material";
import Image from "next/image";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

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
              <Typography className="typing-text">ورود به سامانه مانیتورینگ هوشمند رسام</Typography>
            </div>

            <div className="form__group field">
              <TextField
                id="outlined-basic"
                label="نام کاربری"
                variant="outlined"
                type="username"
                className="form__field"
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </div>
            <div className="form__group field">
              <TextField
                id="outlined-basic"
                label="رمز عبور"
                variant="outlined"
                type="password"
                className="form__field"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </div>
            <div>
              <Button className="login-button">ورود</Button>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
