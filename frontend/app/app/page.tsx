'use server';

import Image from "next/image";
import Logo from "@/public/logo.png";
import { GenerateMetadataProps } from "@/types";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";

export async function generateMetadata(
  _: GenerateMetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const meta = await parent
  return {
    title: `${meta.title?.absolute} | ホーム`,
    description: "ホームページです。",
  }
}

export default async function LoginPage() {

  return (
    <>
      <div className="flex items-center justify-center h-screen w-full">
        <div className="rounded-lg border p-8 w-[30vw]">
          <div className="flex flex-col items-center mb-2">
            <Image src={Logo} alt="Logo" className="mx-auto mb-2 w-24 h-24" />
            <h1 className="text-lg mb-6 text-center font-bold">Login</h1>
          </div>
          <div className="flex items-center justify-center mb-4">
            <Link className="bg-primary-light p-2 rounded-md" href="/login">ログイン</Link>
          </div>
        </div>
      </div>
    </>
  );
}
