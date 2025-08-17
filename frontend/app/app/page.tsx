import Image from "next/image";
import Logo from "@/public/logo.png";
import { GenerateMetadataProps } from "@/types";
import { Metadata, ResolvingMetadata } from "next";
import GoogleSignInButton from "@/components/atoms/GoogleSignInButton";

export async function generateMetadata(
  _: GenerateMetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const meta = await parent
  return {
    title: `${meta.title?.absolute} | ログイン`,
    description: "ログインページです。アカウントをお持ちでない方は、登録してください。",
  }
}

console.log(process.env)

export default function LoginPage() {
  return (
    <>
      <div className="flex items-center justify-center h-screen w-full">
        <div className="rounded-lg border-1 p-8 w-[30vw]">
          <div className="flex flex-col items-center mb-2">
            <Image src={Logo} alt="Logo" className="mx-auto mb-2 w-24 h-24" />
            <h1 className="text-lg mb-6 text-center font-bold">Login</h1>
          </div>
          <div className="flex items-center justify-center mb-4">
            <GoogleSignInButton />
          </div>
        </div>
      </div>
    </>
  );
}
