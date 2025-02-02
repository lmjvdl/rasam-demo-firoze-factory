import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { signIn } from "next-auth/react";
import { Button, Container, TextField, Typography } from "@mui/material";
import Image from "next/image";

// This page is completely written using Pure CSS because of its special styles (triangle shape).
import "./login.css";



export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [captcha, setCaptcha] = useState<string | null>(null);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If CAPTCHA is not completed, do not proceed
    if (!captcha) {
      alert("Please complete the CAPTCHA!");
      return;
    }

    // Send login request with CAPTCHA token
    const result = await signIn("credentials", {
      username,
      password,
      captcha,
    });

    if (result?.error) {
      alert("Invalid credentials or CAPTCHA failed");
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
              <ReCAPTCHA
                sitekey="YOUR_GOOGLE_RECAPTCHA_SITE_KEY"
                onChange={(value: string | null) => setCaptcha(value)} // Explicitly type 'value'
              />
            </div>
            <div>
              <Button className="login-button" onClick={handleSubmit}>ورود</Button>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
