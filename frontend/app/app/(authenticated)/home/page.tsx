import AuthenticatedPageTitle from "@/components/atoms/AuthenticatedPageTitle";
import { query } from "@/lib/server/utils";
import { GenerateMetadataProps } from "@/types";
import { Metadata, ResolvingMetadata } from "next";
import { GetRoomsQuery } from "./gql.query";

export async function generateMetadata(
  _: GenerateMetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const meta = await parent;
  return {
    title: `${meta.title?.absolute} | ホーム`,
    description: "ホーム",
  }
}
export default async function HomePage() {
  const res = await query({
    query: GetRoomsQuery,
    variables: { input: {} },
  });

  console.log("rooms:", res.data.rooms);

  return (
    <AuthenticatedPageTitle title="ホーム" />
  );
}
