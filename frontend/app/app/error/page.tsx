"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

enum Error {
  // NEXTAUTHのエラーコードに合わせる
  Configuration = "Configuration",
  AccessDenied = "AccessDenied",
  Verification = "Verification",
  Default = "Default",
  // 独自エラーコード
  USER_ALREADY_REGISTERED_IN_ANOTHER_PROVIDER = 'USER_ALREADY_REGISTERED_IN_ANOTHER_PROVIDER',
}

const errorMap = {
  [Error.Configuration]: (
    <p>認証設定に問題があります。管理者に連絡してください。</p>
  ),
  [Error.AccessDenied]: (
    <p>アクセスが拒否されました。</p>
  ),
  [Error.Verification]: (
    <p>確認リンクが無効か期限切れです。</p>
  ),
  [Error.USER_ALREADY_REGISTERED_IN_ANOTHER_PROVIDER]: (
    <p>このメールアドレスは別の認証プロバイダーで既に登録されています。</p>
  ),
  [Error.Default]: (
    <p>認証中に問題が発生しました。問題が解決しない場合は管理者に連絡してください。</p>
  ),
}

export default function AuthErrorPage() {
  const search = useSearchParams()
  const error = search.get("error") as Error

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Link
        href="/"
        className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 text-center shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 flex flex-row items-center justify-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          問題が発生しました
        </h5>
        <div className="font-normal text-gray-700 dark:text-gray-400">
          {errorMap[error] || "認証中に問題が発生しました。問題が解決しない場合は管理者に連絡してください。"}
        </div>
      </Link>
    </div>
  )
}