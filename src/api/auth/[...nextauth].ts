import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { useSession } from "next-auth/react";


// authOptions are the main settings for NextAuth that we configure here
export const authOptions = {
  // Setting up the provider to use username and password (Credentials)
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "your-username" },
        password: { label: "Password", type: "password", placeholder: "your-password" },
        captcha: { label: "Captcha", type: "text", placeholder: "enter-captcha-token" } // Adding captcha to credentials
      },

      // This function is responsible for validating the user's submitted credentials
      async authorize(credentials: { username: string; password: string; captcha: string } | undefined) {
        // If credentials or captcha are not provided, return null
        if (!credentials || !credentials.captcha) return null

        const { username, password, captcha } = credentials

        // Verify CAPTCHA with Google reCAPTCHA API
        const captchaSecret = process.env.RECAPTCHA_SECRET_KEY // The reCAPTCHA secret key from ENV
        const captchaVerification = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: captchaSecret!,
            response: captcha, // Sending CAPTCHA token to Google for validation
          }),
        })

        const captchaResponse = await captchaVerification.json()

        // If CAPTCHA is invalid, return null (login fails)
        if (!captchaResponse.success) {
          return null
        }

        // Send credentials to backend for validation
        const res = await fetch("https://your-backend.com/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        })

        const user = await res.json()

        // If the credentials are valid, return the user data
        if (res.ok && user) {
          return user
        }

        // If the credentials are invalid, login will fail
        return null
      },
    }),
  ],

  // Custom sign-in page route we have created
  pages: {
    signIn: "/login", // The sign-in page
  },

  // We are using JWT for session handling
  session: {
    strategy: "jwt" as "jwt", // Using "jwt" as the session strategy
  },

  // Callbacks for handling token and session
  callbacks: {
    // Callback for JWT: Here we store user data inside the token
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        // Adding user data (like id) to the token
        token.id = user.id
      }
      return token
    },

    // Callback for session: Here we store token data inside the session
    async session({ session, token }: { session: any; token: any }) {
      // Adding token data to the session
      session.user.id = token.id
      return session
    },
  },

  // Secret key for encrypting JWT
  secret: process.env.NEXTAUTH_SECRET, // Using ENV variable for the key
}

export default NextAuth(authOptions)
