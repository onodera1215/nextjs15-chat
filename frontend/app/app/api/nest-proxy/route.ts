export const runtime = "nodejs"; // Nodeランタイムで実行(重要edgeで実行されるとjsonwebtokenが動かないため)

import jwt, { SignOptions } from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { StatusCodes } from "http-status-codes";

const PRIVATE_KEY = process.env.NEST_JWT_PRIVATE_KEY!;
export async function POST(req: Request) {
  const token: JWT = await req.json();
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

  const nestAccessToken = jwt.sign(payload, PRIVATE_KEY, signOptions);
  return new Response(JSON.stringify({ nestAccessToken }), {
    status: StatusCodes.CREATED,
  });
}
