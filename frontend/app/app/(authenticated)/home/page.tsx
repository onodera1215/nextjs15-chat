import AuthenticatedPageTitle from "@/components/atoms/AuthenticatedPageTitle";
import { getClient } from "@/lib/server/utils";
import { GenerateMetadataProps } from "@/types";
import gql from "graphql-tag";
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
  const client = await getClient();
  const res = await client.query({
    query: GetRoomsQuery
  });

  console.log(res.data.rooms);

  return (
    <AuthenticatedPageTitle title="ホーム" />
  );
}
