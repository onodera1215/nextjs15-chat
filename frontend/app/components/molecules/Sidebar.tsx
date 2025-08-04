import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="bg-surface h-full p-4">
            <nav>
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
        </aside>
    );
}