import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "mock_client_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock_client_secret",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: {
            staffProfile: true,
          },
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        // For local development, check matching password or demo hash
        if (user.password && user.password !== credentials.password) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          businessId: user.businessId,
          staffId: user.staffProfile?.id || null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.businessId = (user as any).businessId;
        token.staffId = (user as any).staffId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).businessId = token.businessId;
        (session.user as any).staffId = token.staffId;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "businessflow-super-secret-jwt-key-2026",
};
