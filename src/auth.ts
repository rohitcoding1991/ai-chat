import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
// import { skipCSRFCheck } from "@auth/core";
import prismaClient from "@/prisma/prisma";

/**
 * The prompt parameter controls how the consent screen is presented to the user. Common values include:
  - "none": Do not display any authentication or consent screens. This is useful for checking if a user is already authenticated without prompting them to log in again.
  - "consent": Forces the consent screen to be displayed again, even if the user has previously consented to the same scopes. This is useful if your application needs to ensure that the user explicitly re-consents to the requested scopes.
  - "select_account": Prompts the user to select an account, even if they are already signed in. This is useful if you want the user to have the option to switch accounts.

  Response type:
  - "code": Indicates that your application will receive an authorization code that can be exchanged for an access token and, optionally, a refresh token. This is part of the authorization code grant flow, which is more secure than directly receiving an access token.
  - "token": Indicates that your application will directly receive an access token. This is part of the implicit grant flow, which is generally used for client-side applications without a backend server.
**/

const config = {
  trustHost: true,
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV !== "production",
  // skipCSRFCheck: skipCSRFCheck,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // allow OAuth without any verification
      if (account?.provider !== "credentials") {
        return true;
      }

      return false;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    async jwt({ token, user, account, profile }) {
      console.log(
        {
          token,
          user,
          account,
          profile,
        },
        "inside jwt callback"
      );
      return { ...token, ...user };
    },
    async session({ session, user, token }) {
      // token is the whatever jwt function returns
      console.log(
        {
          session,
          user,
          token,
        },
        "inside session callback"
      );
      session.user.id = token.sub ?? "";
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
