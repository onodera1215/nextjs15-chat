import Link from "next/link";
import { auth } from "@/auth";
import { logout } from "@/lib/server-actions/utils";
import SearchInput from "../atoms/SearchInput";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default async function Header() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  return (
    <header className="bg-surface grid grid-cols-12">
      <div className="col-span-4">
        <Link href="/home">
          <div className="flex items-center justify-start h-full">
            <Bars3Icon className="h-6 w-6 text-primary ml-4 lg:hidden hover:cursor-pointer" />
            <div>
              <h1 className="text-2xl font-bold text-primary ml-4">Chat Application</h1>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center col-span-4">
        <SearchInput className="lg:block hidden" />
      </div>
      <div className="flex items-center col-span-4 justify-end mr-2">
        {!isLoggedIn && (
          <Link
            href="/"
            className="text-sm bg-background-light text-primary px-4 py-2 rounded-md"
          >
            ログイン
          </Link>
        )}
        {isLoggedIn && (
          <form action={logout}>
            <button
              type="submit"
              className="text-sm bg-background-light text-primary px-4 py-2 rounded-md ml-2"
            >
              ログアウト
            </button>
          </form>
        )}
      </div>
    </header>
  );
}
