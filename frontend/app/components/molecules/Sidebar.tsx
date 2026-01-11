'use client';

import { BellAlertIcon, HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SidebarNavigationButton from "../atoms/SidebaNavigationButtons";
import { UserCircle } from "lucide-react";
import SidebarHeading from "../atoms/SidebarHeading";
import SidebarChannels from "../atoms/SidebarChannels";
import { useAppSelector } from "@/store/hooks";


export default function Sidebar() {
    const test = useAppSelector(state => state.entityReducer);
    console.log("Sidebar test:", test);
    return (
        <aside className="bg-surface h-full relative">
            <div className="grid grid-cols-10 mb-4 h-full">
                <nav className="col-span-3">
                    <SidebarNavigationButton url="/home" icon={<HomeIcon />} title="ホーム" />
                    <SidebarNavigationButton url="/profile" icon={<UserCircle />} title="プロフィール" />
                    <SidebarNavigationButton url="/activity" icon={<BellAlertIcon />} title="アクティビティ" />
                </nav>
                <nav className="col-span-7 bg-background h-full rounded-tl-lg py-4 ">
                    <ul className="space-y-2 px-2">
                        <li>
                            <SidebarHeading title="チャンネル" url="#" />
                            <SidebarChannels
                                channels={[
                                    { title: "default", url: "/room/default" },
                                ]}
                            />
                        </li>
                        <li>
                            <SidebarHeading title="ダイレクトメッセージ" url="/" />
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
            <div className="absolute right-0 top-0 h-full w-px shadow-[2px_2px_2px_1px_rgba(0,0,0,0.1)]"></div>
        </aside>
    );
}