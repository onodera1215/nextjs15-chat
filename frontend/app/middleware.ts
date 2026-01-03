import { auth } from "@/auth";

export default auth((req) => {
  console.log("Middleware - pathname:", req.nextUrl.pathname);
  console.log("Middleware - req.auth:", req.auth);

  const { pathname } = req.nextUrl;
  if (!["/", "/login"].includes(pathname) && !req.auth) {
    // ユーザーが認証されていない場合、トップページにリダイレクト
    return Response.redirect(new URL("/", req.url));
  }
});

export const config = {
  // mathcherにマッチしたパスだけミドルウェアが実行される
  matcher: [
    "/activity/:path*",
    "/home/:path*",
    "/profile/:path*",
    "/room/:path*",
    // これは否定先読みでここに書かれたパスは除外される
    "/((?!_next/static|_next/image|favicon.ico|api|login|register).*)",
  ],
};
