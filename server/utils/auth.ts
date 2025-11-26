import { betterAuth } from "better-auth";
import { getDatabase } from "../db";

export const auth = betterAuth({
  database: getDatabase(),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
