import "server-only";
import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { SignJWT, importPKCS8 } from "jose";

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
      const newSession = {
        ...session,
        nestAccessToken: token.nestAccessToken,
        user: {
          ...session.user,
          id: (token.sub as string | undefined) ?? session.user.id,
        },
        roles: (token.roles as string[] | undefined) ?? session.user.roles,
      };
      return newSession;
    },
    async jwt({ token, user }) {
      // 初回ログイン時にユーザー情報をトークンに保存
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }

      // NEST_JWT_PRIVATE_KEYが設定されている場合のみ、nestAccessTokenを生成
      if (PRIVATE_KEY) {
        try {
          const privateKey = await importPKCS8(PRIVATE_KEY, "RS256");

          const nestAccessToken = await new SignJWT({
            sub: token.sub as string | undefined,
            email: token.email as string | undefined,
            name: token.name as string | undefined,
            roles: token.roles as string[] | undefined,
          })
            .setProtectedHeader({ alg: "RS256" })
            .setIssuedAt()
            .setExpirationTime("15m")
            .setAudience(process.env.NEST_JWT_AUD!)
            .setIssuer(process.env.NEST_JWT_ISS!)
            .sign(privateKey);

          token.nestAccessToken = nestAccessToken;
        } catch (error) {
          console.error("JWT signing error:", error);
        }
      }

      return token;
    },
    async redirect({ baseUrl }) {
      return new URL("/home", baseUrl).toString();
    },
    async signIn({ user, account, profile, email }) {
      console.log("signIn:", user, account, profile, email);
      return true;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
