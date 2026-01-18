import Link from "next/link";

interface Props {
  title: string;
  url: string;
}

export default function SidebarHeading({ title, url }: Props) {
  return (
    <>
      <Link
        href={url}
        className="font-bold text-primary hover:none cursor-none"
      >
        {title}
      </Link>
      <div className="mt-1 h-px w-full bg-gradient-to-r bg-gray-300"></div>
    </>
  );
}
