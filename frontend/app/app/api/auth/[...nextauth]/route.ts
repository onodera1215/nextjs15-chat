import { handlers } from "@/auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { GET: NextAuthGetHandler } = handlers;
  return NextAuthGetHandler(request);
}

export async function POST(request: NextRequest) {
  const { POST: NextAuthPostHandler } = handlers;
  return NextAuthPostHandler(request);
}
