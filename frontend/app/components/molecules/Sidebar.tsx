"use client";

import { BellAlertIcon, HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SidebarNavigationButton from "../atoms/SidebaNavigationButtons";
import { UserCircle } from "lucide-react";
import SidebarHeading from "../atoms/SidebarHeading";
import SidebarChannels from "../atoms/SidebarChannels";
import { useJoinedRoomsSelector } from "@/store/slices/entity/rooms-slice";
import { useUsersSelector } from "@/store/slices/entity/users-slice";

interface Props {
  onAddChannelButtonClick: () => void;
  onJoinRoomButtonClick: () => void;
  onAddUserButtonClick: () => void;
}

export default function Sidebar({
  onAddChannelButtonClick,
  onJoinRoomButtonClick,
  onAddUserButtonClick,
}: Props) {
  const rooms = useJoinedRoomsSelector();
  const users = useUsersSelector();
  return (
    <aside className="bg-surface h-full relative">
      <div className="grid grid-cols-10 mb-4 h-full">
        <nav className="col-span-3">
          <SidebarNavigationButton
            url="/home"
            icon={<HomeIcon />}
            title="ホーム"
          />
          <SidebarNavigationButton
            url="/profile"
            icon={<UserCircle />}
            title="プロフィール"
          />
          <SidebarNavigationButton
            url="/activity"
            icon={<BellAlertIcon />}
            title="アクティビティ"
          />
        </nav>
        <nav className="col-span-7 bg-background h-full rounded-tl-lg py-4 ">
          <ul className="space-y-2 px-2">
            <li>
              <SidebarHeading
                title="チャンネル"
                url="#"
                onClickAddButton={onAddChannelButtonClick}
              />
              <div className="px-2 pt-2">
                <button
                  type="button"
                  onClick={onJoinRoomButtonClick}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  ルームに参加
                </button>
              </div>
              <SidebarChannels
                channels={rooms.map((room) => ({
                  title: room.name,
                  url: `/room/${room.id}`,
                }))}
              />
            </li>
            <li>
              <SidebarHeading
                title="ユーザー"
                url="/"
                onClickAddButton={onAddUserButtonClick}
              />
              <div className="ml-4">
                <ul className="mt-2 space-y-1">
                  {users.allIds.map((id) => (
                    <li key={id}>
                      <Link href="#" className="text-primary hover:none">
                        {users.byId[id].name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <div className="absolute right-0 top-0 h-full w-px shadow-[2px_2px_2px_1px_rgba(0,0,0,0.1)]"></div>
    </aside>
  );
}
