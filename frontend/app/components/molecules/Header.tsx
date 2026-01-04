import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Logo from "../../public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { logout } from "@/lib/server-actions/utils";

export default async function Header() {
    const session = await auth();
    const isLoggedIn = !!session?.user;
    return <header className="bg-surface grid grid-cols-12">
        <div className="col-span-4">
            <Link href="/home">
                <div className="flex items-center justify-start h-full">
                    <Image src={Logo} alt="Logo" className="h-12 w-auto ml-6" />
                    <div>
                        <h1 className="text-2xl font-bold text-primary ml-4">Whisp</h1>
                    </div>
                </div>
            </Link>
        </div>
        <div className="flex items-center col-span-4">
            <div className="relative w-full max-w-md">
                <input
                    type="text"
                    placeholder="検索"
                    className="w-full pl-4 pr-10 py-2 rounded-full text-primary  focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white transition"
                />
                <button
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                >
                    <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
            </div>

        </div>
        <div className="flex items-center col-span-4 justify-end mr-2">
            {!isLoggedIn && <Link href="/" className="text-sm bg-background-light text-primary px-4 py-2 rounded-md">ログイン</Link>}
            {isLoggedIn && <form action={logout}>
                <button type="submit" className="text-sm bg-background-light text-primary px-4 py-2 rounded-md ml-2">ログアウト</button>
            </form>}
        </div>
    </header>
}