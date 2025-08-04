"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Logo from "../../public/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return <header className="bg-surface grid grid-cols-12">
        <div className="col-span-4">
            <Link href="/">
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
            <Link href="/login" className="text-sm bg-background-light text-primary px-4 py-2 rounded-md">ログイン</Link>
            <Link href="/signup" className="text-sm bg-background-light text-primary px-4 py-2 rounded-md ml-2">サインアップ</Link>
        </div>
    </header>
}