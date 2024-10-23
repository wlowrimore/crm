import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { User } from "@prisma/client";
import { db } from "../lib/db";
import { AdapterUser } from "next-auth/adapters";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        console.log("Authorizing credentials", { email: credentials?.email });

        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing credentials");
            return null;
          }

          const user = await db.user.findUnique({
            where: { email: credentials.email as string },
            select: {
              id: true,
              email: true,
              name: true,
              password: true,
              role: true,
            },
          });

          console.log("Found user:", {
            userId: user?.id,
            hasPassword: !!user?.password,
            role: user?.role,
          });

          if (!user || !user.password) {
            console.log("User not found or has no password");
            return null;
          }

          const isPasswordValid = await compare(
            credentials.password as string,
            user.password
          );

          console.log("Password validation result:", isPasswordValid);

          if (!isPasswordValid) {
            console.log("Invalid password");
            return null;
          }

          console.log("Authentication successful");
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signIn",
  },
  callbacks: {
    async session({
      session,
      token,
      user,
    }: {
      session: any;
      token: any;
      user: AdapterUser;
    }) {
      console.log("Session Callback - BEFORE:", {
        originalSession: JSON.stringify(session),
        originalToken: JSON.stringify(token),
        originalUser: JSON.stringify(user),
      });
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }

      console.log("Session Callback - AFTER:", {
        modifiedSession: JSON.stringify(session),
      });

      return session;
    },
    async jwt({ token, user, account, trigger }) {
      console.log("JWT Callback - BEFORE:", {
        trigger,
        originalToken: JSON.stringify(token),
        originalUser: JSON.stringify(user),
        originalAccount: JSON.stringify(account),
      });

      if (user && "role" in user) {
        token.id = user.id;
        token.role = user.role;
      }

      console.log("JWT Callback - AFTER:", {
        updatedToken: JSON.stringify(token),
      });

      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_Err === "production",
      },
    },
  },
  debug: true,
  events: {
    signIn: (message) => {
      console.log("Sign in event:", message);
    },
    session: ({ session, token }) => {
      console.log("Session event:", {
        sessionData: JSON.stringify(session),
        tokenData: JSON.stringify(token),
      });
    },
  },
});
