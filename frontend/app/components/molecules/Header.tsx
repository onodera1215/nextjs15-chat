"use client";

interface Props {
    title: string;
}
export default function Header({ title }: Props) {
    return <header className="bg-surface grid grid-cols-12">
        <div className="flex items-center col-span-4">
            <h1 className="text-lg font-bold text-primary ml-2">{title}</h1>
        </div>
        <div className="flex items-center col-span-4">
            <input type="text" className="border bg-background rounded-md w-full mx-auto px-2 py-1" name="keyword" />
        </div>
        <div className="flex items-center col-span-4 justify-end mr-2">
            <button className="text-sm bg-primary text-primary-light px-4 py-2 rounded-md">ログイン</button>
            <button className="text-sm bg-primary text-primary-light px-4 py-2 rounded-md ml-2">サインアップ</button>
        </div>
    </header>
}