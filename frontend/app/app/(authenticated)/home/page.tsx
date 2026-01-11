import { GenerateMetadataProps } from "@/types";
import { Metadata, ResolvingMetadata } from "next";
import Content from "./content";

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
  return (
    <Content />
  );
}
