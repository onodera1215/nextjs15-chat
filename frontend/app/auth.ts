import "server-only";
import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import jwt, { SignOptions } from "jsonwebtoken";

const PRIVATE_KEY = process.env.NEST_JWT_PRIVATE_KEY!;

export const authOptions: NextAuthConfig = {
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    GitHub,
  ],
  callbacks: {
    // NextAuth の定義に合わせた引数。戻り値は Session 全体を返す
    async session({ session, token }) {
      console.log("Session callback - token:", token);
      console.log("Session callback - session:", session);
      
      const newSession = {
        ...session,
        nestAccessToken: token.nestAccessToken,
        user: { 
          ...session.user,
          id: (token.sub as string | undefined) ?? session.user.id 
        },
        roles: (token.roles as string[] | undefined) ?? session.user.roles,
      };
      console.log("Session callback - newSession:", newSession);
      return newSession;
    },
    async jwt({ token, user, account }) {
      console.log("JWT callback - user:", user);
      console.log("JWT callback - account:", account);
      console.log("JWT callback - token before:", token);
      
      // 初回ログイン時にユーザー情報をトークンに保存
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      
      const payload = {
        sub: token.sub as string | undefined,
        email: token.email as string | undefined,
        name: token.name as string | undefined,
        roles: token.roles as string[] | undefined,
      };

      const signOptions: SignOptions = {
        algorithm: "RS256",
        expiresIn: "15m",
        audience: process.env.NEST_JWT_AUD,
        issuer: process.env.NEST_JWT_ISS,
      };

      const nestAccessToken = jwt.sign(payload, PRIVATE_KEY, signOptions);

      const finalToken = {
        ...token,
        nestAccessToken,
      };
      
      console.log("JWT callback - token after:", finalToken);
      return finalToken;
    },
    async redirect({ baseUrl }) {
      return new URL("/home", baseUrl).toString();
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
