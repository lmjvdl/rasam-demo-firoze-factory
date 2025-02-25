import { z } from "zod";

const authResponseSchema = z
  .object({
    status_code: z.number(),
    success: z.boolean(),
    messages: z.string(),
    data: z.object({
      id: z.number(),
      username: z.string(),
      tokens: z.object({
        access: z.string(),
        refresh: z.string(),
      }),
      last_login: z.string().nullable(),
      permissions: z.array(z.string()),
      profile_image: z.nullable(z.string()),
    }),
  })
  .transform((val) => ({
    statusCode: val.status_code,
    success: val.success,
    messages: val.messages,
    data: {
      id: val.data.id,
      username: val.data.username,
      accessToken: val.data.tokens.access,
      refreshToken: val.data.tokens.refresh,
      lastLogin: val.data.last_login,
      permissions: val.data.permissions,
      profileImage: val.data.profile_image,
    },
  }));



export type AuthResponse = z.infer<typeof authResponseSchema>;

export default function AuthResponseSanitizer(pollutedData: unknown) {
  try {
    return authResponseSchema.parse(pollutedData);
  } catch (err) {
    throw new Error("متاسفانه داده دریافتی ناقص است لطفا دوباره تلاش نمایید.");
  }
}
