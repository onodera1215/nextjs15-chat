import NextAuth from "next-auth";
import { authOptions } from "@/auth";

export const { auth } = NextAuth(authOptions);

const publicRoutes = ["/", "/login", "/register", "/api/public", "/api/auth/"];

// middleware のロジック全体を auth 関数でラップする
const middleware = auth(async (req) => {
  const { pathname } = req.nextUrl;
  const isAuth = !!req.auth;

  const isPublicRoute =
    publicRoutes.includes(pathname) || pathname.startsWith("/api/public");

  if (!isAuth && !isPublicRoute) {
    return Response.redirect(new URL("/", req.url));
  }
});

export default middleware;
export const config = {
  matcher: [
    // 以下のパスではミドルウェアを実行しない
    // '/api/public/:path*', // パブリックなAPIルート
    // '/login', // ログインページ
    // 他にも除外したいパスを追加可能

    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - /api/public (public API routes)
     * - /login (login page)
     * - /register (register page)
     */
    "/((?!_next/static|_next/image|favicon.ico|api/public|login|register).*)",
  ],
};
