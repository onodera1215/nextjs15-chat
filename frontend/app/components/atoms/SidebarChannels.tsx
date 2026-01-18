import Link from "next/link";

interface Props {
  channels: { title: string; url: string }[];
}

export default function SidebarChannels({ channels }: Props) {
  return (
    <div className="ml-4">
      <ul className="mt-2 space-y-1">
        {channels.map((channel, index) => (
          <li key={index}>
            <Link href={channel.url} className="text-primary hover:none">
              {channel.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
