
import Image from 'next/image';
import Logo from '@/public/logo.png';
export default function NotFoundPage() {
  return <>
    <div className="flex items-center justify-center h-full">
      <div>
        <h1 className="text-4xl font-bold">404 - Not Found</h1>
        <div className="w-[20vw]">
          <Image src={Logo} alt="Logo" className="mx-auto mt-10" />
        </div>
        <h2 className="text-center text-2xl font-bold mt-4">
          ページが見つかりません
        </h2>
        <p>お探しのページが見つかりません。URLを確認してください。</p>
      </div>
    </div>
  </>;
}