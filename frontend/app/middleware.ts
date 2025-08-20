import { auth } from "@/auth";

export default auth((req) => {
  console.log("auth: ", req.auth);
});

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
    "/",
    "/((?!_next/static|_next/image|favicon.ico|api/public|login|register).*)",
  ],
};
