import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="bg-surface h-full">
            <div className="grid grid-cols-6 mb-4 h-full">
                <nav className="col-span-2">


                    <div className="flex flex-col">
                        <div className="flex items-center justify-center w-full">
                            <Link
                                href="#"
                                className="text-primary m-1 rounded-[0.5rem] border border-surface-500 hover:bg-secondary transform transition-transform duration-200 hover:scale-110 flex flex-col items-center px-2 py-1"
                            >
                                <HomeIcon className="h-7 w-7 mb-[0.5]" />
                                <p>ホーム</p>
                            </Link>
                        </div>
                    </div>

                </nav>
                <nav className="col-span-4 bg-background h-full rounded-tl-lg p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link href="#" className="text-primary hover:none">ホーム</Link>
                        </li>
                        <li>
                            <Link href="#" className="text-primary hover:none cursor-none">チャンネル</Link>
                            <div className="ml-4">
                                <ul className="mt-2 space-y-1">
                                    <li>
                                        <Link href="#" className="text-primary hover:none"># general</Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-primary hover:none"># random</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link href="#" className="text-primary hover:none cursor-none">ダイレクトメッセージ</Link>
                            <div className="ml-4">
                                <ul className="mt-2 space-y-1">
                                    <li>
                                        <Link href="#" className="text-primary hover:none">#ユーザー1</Link>
                                    </li>
                                    <li>
                                        <Link href="#" className="text-primary hover:none">#ユーザー2</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </nav>

            </div>
        </aside>
    );
}