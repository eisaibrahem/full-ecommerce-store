import type { AuthOptions } from "next-auth";

export const authConfig: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [],

  callbacks: {
    async signIn() {
      return true;
    },
    async session({ session }) {
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
};

export default authConfig;
