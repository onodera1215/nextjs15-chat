import "server-only";
import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthConfig = {
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    // NextAuth の定義に合わせた引数。戻り値は Session 全体を返す
    async session({ session, token }) {
      const newSession = {
        ...session,
        nestAccessToken: token.nestAccessToken,
        user: { id: (token.sub as string | undefined) ?? session.user.id },
        roles: (token.roles as string[] | undefined) ?? session.user.roles,
      };
      return newSession;
    },

    async redirect({ baseUrl }) {
      // バックエンド側でログイン処理　or 登録完了処理が終わったらリダイレクト失敗したらエラーページに遷移。
      return new URL("/home", baseUrl).toString();
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
