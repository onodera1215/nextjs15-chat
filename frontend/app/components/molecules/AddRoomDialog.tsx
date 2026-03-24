import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { DoorOpen, Search } from "lucide-react";

export type JoinableRoom = {
  id: string;
  name: string;
  description?: string;
};

type Props = {
  rooms: JoinableRoom[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (payload: { roomId: string }) => Promise<void> | void;
};

export default function AddRoomDialog({
  rooms,
  open,
  onOpenChange,
  onSubmit,
}: Props) {
  const [search, setSearch] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const filteredRooms = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) {
      return rooms;
    }

    return rooms.filter((room) => {
      const target = `${room.name} ${room.description ?? ""}`.toLowerCase();
      return target.includes(keyword);
    });
  }, [rooms, search]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setSearch("");
      setSelectedRoomId("");
      setSubmitting(false);
    }
    onOpenChange?.(nextOpen);
  };

  const handleSubmit = async () => {
    if (!selectedRoomId) {
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit?.({ roomId: selectedRoomId });
      handleOpenChange(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[680px]">
        <DialogHeader>
          <DialogTitle>ルームに参加</DialogTitle>
          <DialogDescription>
            未参加のルーム一覧から参加したいルームを選択できます。
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="ルーム名で検索"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ScrollArea className="h-[320px] rounded-md border">
          <div className="p-2">
            {filteredRooms.length === 0 ? (
              <div className="flex h-[280px] items-center justify-center text-sm text-muted-foreground">
                参加できるルームがありません。
              </div>
            ) : (
              filteredRooms.map((room) => {
                const selected = selectedRoomId === room.id;

                return (
                  <button
                    type="button"
                    key={room.id}
                    onClick={() => setSelectedRoomId(room.id)}
                    className={`mb-2 flex w-full items-start justify-between rounded-md border px-4 py-3 text-left transition-colors ${
                      selected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/60"
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="font-medium">{room.name}</div>
                      {room.description ? (
                        <div className="mt-1 text-sm text-muted-foreground">
                          {room.description}
                        </div>
                      ) : null}
                    </div>
                    {selected ? <Badge>選択中</Badge> : null}
                  </button>
                );
              })
            )}
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            キャンセル
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedRoomId || submitting}
          >
            <DoorOpen className="size-4" />
            参加する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
