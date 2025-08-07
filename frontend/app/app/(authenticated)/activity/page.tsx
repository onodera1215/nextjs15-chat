import AuthenticatedPageTitle from "@/components/atoms/AuthenticatedPageTitle";
import { GenerateMetadataProps } from "@/types";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  _: GenerateMetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const meta = await parent;
  return {
    title: `${meta.title?.absolute} | アクティビティ`,
    description: "アクティビティ",
  }
}

export default function ActivityPage() {
  return (
    <AuthenticatedPageTitle title="アクティビティ" />
  );
}
