import { graphql } from "@/graphql";
import { executeGql } from "@/lib/server/utils";

const IsRegisteredUserQuery = graphql(`
  query queryIsRegisteredUser {
    isRegisteredUser
  }
`);

export async function POST() {
  const { isRegisteredUser } = await executeGql<{ isRegisteredUser: boolean }>(
    IsRegisteredUserQuery,
    undefined
  );
  return new Response(JSON.stringify({ isRegisteredUser }), {
    headers: { "Content-Type": "application/json" },
  });
}
