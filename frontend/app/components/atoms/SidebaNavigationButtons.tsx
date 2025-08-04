import Link from "next/link";

interface Props {
  title: string;
  icon: React.ReactNode;
  url: string;
}
export default function SidebarNavigationButton({ url, title, icon }: Props) {
  return <div className="flex flex-col">
    <div className="flex items-center justify-center">
      <Link
        href={url}
        className="text-primary m-1 rounded-[0.5rem] border border-surface-500 hover:bg-secondary transform transition-transform duration-200 hover:scale-105 flex flex-col items-center p-2 min-w-[60%]"
      >
        <div className="h-5 w-5 mb-1">
          {icon}
        </div>
        <p className="text-[0.6rem] text-nowrap">{title}</p>
      </Link>
    </div>
  </div>
    ;
}