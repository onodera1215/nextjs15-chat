import "server-only";
import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { SignJWT, importPKCS8 } from "jose";
import {
  executeMutationCreateUser,
  executeQueryRegisteredUser,
} from "../lib/server/utils";

const PRIVATE_KEY = process.env.NEST_JWT_PRIVATE_KEY!;

export const authOptions: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: {
    error: "/error",
  },
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
        user: {
          ...session.user,
          id: (token.sub as string | undefined) ?? session.user.id,
        },
        roles: (token.roles as string[] | undefined) ?? session.user.roles,
      };
      return newSession;
    },
    async jwt({ token, account, user }) {
      // ログイン時にユーザー情報をトークンに保存
      if (account && account.providerAccountId && user) {
        // TODO: 後でexecuteUserとかで取得するようにする
        const { registeredUser } = await executeQueryRegisteredUser({
          oauthProvider: account.provider,
          oauthProviderAccountId: account.providerAccountId,
        });
        token.provider = account.provider;
        token.userId = registeredUser.user?.id;
        token.sub = account.providerAccountId;
        token.email = user.email;
        token.name = user.name;

        try {
          const privateKey = await importPKCS8(PRIVATE_KEY, "RS256");

          const nestAccessToken = await new SignJWT({
            sub: token.userId as string | undefined,
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

          console.log("Generated Nest Access Token:", nestAccessToken);

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
    async signIn({ user, account }) {
      if (!user.email || !account) {
        return false;
      }
      const { registeredUser, errors } = await executeQueryRegisteredUser({
        oauthProvider: account.provider,
        oauthProviderAccountId: account.providerAccountId,
      });
      if (registeredUser.isRegisteredInAnotherProvider) {
        throw new Error("USER_ALREADY_REGISTERED_IN_ANOTHER_PROVIDER");
      }
      if (errors && errors.length > 0) {
        return false;
      }
      if (!account.provider || !user.email || !user.name) {
        return false;
      }
      if (
        !registeredUser.isRegistered &&
        !registeredUser.isRegisteredInAnotherProvider
      ) {
        const { userNode, errors } = await executeMutationCreateUser({
          name: user.name,
          email: user.email,
          icon: user.image || "NO_ICON_IMAGE",
          oauthProvider: account.provider,
          oauthProviderAccountId: account.providerAccountId,
        });
        return !!userNode && !errors;
      }
      if (
        registeredUser.isRegistered &&
        !registeredUser.isRegisteredInAnotherProvider
      ) {
        return true;
      }
      return false;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
