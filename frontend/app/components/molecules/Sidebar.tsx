import { BellAlertIcon, HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SidebarNavigationButton from "../atoms/SidebaNavigationButtons";
import { UserCircle } from "lucide-react";

export default function Sidebar() {
    return (
        <aside className="bg-surface h-full relative">
            <div className="grid grid-cols-5 mb-4 h-full">
                <nav className="col-span-2">
                    <SidebarNavigationButton icon={<HomeIcon />} title="ホーム" />
                    <SidebarNavigationButton icon={<UserCircle />} title="プロフィール" />
                    <SidebarNavigationButton icon={<BellAlertIcon />} title="アクティビティ" />
                </nav>
                <nav className="col-span-3 bg-background h-full rounded-tl-lg p-4 ">
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
            <div className="absolute right-0 top-0 h-full w-px bg-gray-300 shadow-md"></div>
        </aside>
    );
}