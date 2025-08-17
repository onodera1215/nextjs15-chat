import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import jwt, { SignOptions, Secret } from "jsonwebtoken";

const PRIVATE_KEY: Secret = process.env.NEST_JWT_PRIVATE_KEY!;

export const authOptions: {
  config: NextAuthConfig;
} = {
  config: {
    session: { strategy: "jwt" },
    providers: [
      Google({
        clientId: process.env.AUTH_GOOGLE_ID!,
        clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      }),
    ],
    callbacks: {
      async jwt({ token }) {
        const payload = {
          sub: token.sub as string | undefined, // Googleのsubject
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

        token.nestAccessToken = jwt.sign(payload, PRIVATE_KEY, signOptions);
        return token;
      },

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
        return new URL("/home", baseUrl).toString();
      },
    },
  },
};

export const {
  handlers: { GET, POST },
} = NextAuth(authOptions.config);
