import AuthenticatedPageTitle from "@/components/atoms/AuthenticatedPageTitle";
import { GenerateMetadataProps } from "@/types";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  _: GenerateMetadataProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const meta = await parent;
  return {
    title: `${meta.title?.absolute} | プロフィール編集`,
    description: "プロフィール編集",
  };
}

export default function ProfilePage() {
  return <AuthenticatedPageTitle title="プロフィール編集" />;
}
