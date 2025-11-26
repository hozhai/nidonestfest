import { betterAuth } from "better-auth";
import { getDatabase } from "../db";

let _auth: ReturnType<typeof betterAuth> | null = null;

export function getAuth() {
  if (!_auth) {
    _auth = betterAuth({
      database: getDatabase(),
      socialProviders: {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
      },
    });
  }
  return _auth;
}

// Export as 'auth' for backward compatibility
export const auth = new Proxy({} as ReturnType<typeof betterAuth>, {
  get(_target, prop) {
    return (getAuth() as any)[prop];
  },
});
