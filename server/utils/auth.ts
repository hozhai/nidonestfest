import { betterAuth } from "better-auth";
import { sqlite } from "../db";

export const auth = betterAuth({
  database: sqlite,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
