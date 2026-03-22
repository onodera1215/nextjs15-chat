import { AddSquare28Filled } from "@fluentui/react-icons";
import Link from "next/link";

interface Props {
  title: string;
  url: string;
  onClickAddButton?: () => void;
}

export default function SidebarHeading({ title, url, onClickAddButton }: Props) {
  return (
    <>
      <div className="flex align-center justify-between px-2">
        <Link
          href={url}
          className="font-bold hover:none cursor-none"
        >
          {title}
        </Link>
        <div onClick={onClickAddButton}>
          <AddSquare28Filled className="size-4 cursor-pointer" />
        </div>
      </div>
      <div className="mt-1 h-px w-full bg-linear-to-r bg-gray-300"></div>
    </>
  );
}
