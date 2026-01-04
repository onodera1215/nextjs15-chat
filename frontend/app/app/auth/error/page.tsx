import Link from "next/link";

const messages: Record<string, string> = {
  Configuration: "認証設定に問題があります。管理者に連絡してください。",
  AccessDenied: "アクセスが拒否されました。",
  Verification: "確認リンクが無効か期限切れです。",
  Default: "サーバーエラーが発生しました。",
};

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const key = error && error in messages ? error : "Default";

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">認証エラー</h1>
      <p>{messages[key]}</p>

      <div className="flex gap-3">
        <Link className="underline" href="/auth/signin">
          サインインに戻る
        </Link>
        <Link className="underline" href="/">
          トップへ
        </Link>
      </div>
    </div>
  );
}
