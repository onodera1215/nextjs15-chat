import Image from "next/image";


interface Props {
  senderIconUrl: string;
  senderName: string;
  sentAt: string;
  content: string;
}
export default function Message({
  senderIconUrl,
  senderName,
  sentAt,
  content,
}: Props) {
  return (
    <section className="border border-gray-300 rounded-lg p-4 mb-4">
      <div className="flex justify-start items-center">
        <div>
          <Image
            width={30}
            height={0}
            sizes="100vw"
            style={{ height: "auto" }}
            src={senderIconUrl}
            alt="アイコン"
          />
        </div>
        <div className="text-sm ml-2">{senderName}</div>
        <div className="text-sm ml-2">{sentAt}</div>
        <hr className="my-4 border-t border-gray-400" />
      </div>
      <article>
        <p className="text-sm">
          {content}
        </p>
      </article>
    </section>
  );
}