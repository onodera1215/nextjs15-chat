import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { body }: { body: { email: string } } = await req.json();
}
