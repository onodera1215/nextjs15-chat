import Image from "next/image";
import Logo from "@/public/logo.png";

export default function LoginPage() {
  return (
    <>
      <div className="flex items-center justify-center h-screen w-full">
        <div className="rounded-lg border-1 p-8 w-[30vw]">
          <div className="flex flex-col items-center mb-2">
            <Image src={Logo} alt="Logo" className="mx-auto mb-2 w-24 h-24" />
            <h1 className="text-lg mb-6 text-center font-bold">Login</h1>
          </div>
          <form action="">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">メールアドレス</label>
              <input type="text" name="email" id="email" className="border border-gray-300 rounded-md p-2 w-full" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium mb-2">パスワード</label>
              <input type="text" name="password" id="password" className="border border-gray-300 rounded-md p-2 w-full" />
            </div>
            <div className="flex justify-center">
              <button type="submit" className="w-2/3 bg-surface text-primary py-2 rounded-md hover:bg-secondary transition-colors">
                ログイン
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
