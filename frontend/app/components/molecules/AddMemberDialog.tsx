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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Search, Users } from "lucide-react";

export type Invitee = {
  id: string;
  name: string;
  email: string;
};

export type InvitableRoom = {
  id: string;
  name: string;
};

type Props = {
  rooms: InvitableRoom[];
  candidates: Invitee[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (payload: {
    roomId: string;
    inviteeIds: string[];
  }) => Promise<void> | void;
};

export function InviteMembersDialog({
  rooms,
  candidates,
  open,
  onOpenChange,
  onSubmit,
}: Props) {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) {
      return candidates;
    }

    return candidates.filter((user) => {
      const target = `${user.name} ${user.email}`.toLowerCase();
      return target.includes(keyword);
    });
  }, [search, candidates]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setSearch("");
      setSelectedIds([]);
      setSelectedRoomId("");
      setSubmitting(false);
      setError(null);
    }
    onOpenChange?.(nextOpen);
  };

  const toggle = (id: string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked
        ? [...new Set([...prev, id])]
        : prev.filter((value) => value !== id),
    );
  };

  const handleSubmit = async () => {
    if (!selectedRoomId || selectedIds.length === 0) {
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await onSubmit?.({ roomId: selectedRoomId, inviteeIds: selectedIds });
      handleOpenChange(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "招待の作成に失敗しました。",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[680px]">
        <DialogHeader>
          <DialogTitle>ユーザーを招待</DialogTitle>
          <DialogDescription>
            招待先のルームを選び、参加させたいユーザーを指定します。
          </DialogDescription>
        </DialogHeader>

        <Select value={selectedRoomId} onValueChange={setSelectedRoomId}>
          <SelectTrigger>
            <SelectValue placeholder="招待先のルームを選択" />
          </SelectTrigger>
          <SelectContent>
            {rooms.map((room) => (
              <SelectItem key={room.id} value={room.id}>
                {room.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="名前またはメールアドレスで検索"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ScrollArea className="h-[300px] rounded-md border">
          <div className="p-2">
            {filtered.length === 0 ? (
              <div className="flex h-[260px] items-center justify-center text-sm text-muted-foreground">
                招待できるユーザーが見つかりません。
              </div>
            ) : (
              filtered.map((user) => {
                const checked = selectedIds.includes(user.id);

                return (
                  <label
                    key={user.id}
                    className="mb-2 flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2 hover:bg-muted/60"
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(value) =>
                        toggle(user.id, Boolean(value))
                      }
                    />
                    <Avatar>
                      <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium">{user.name}</div>
                      <div className="truncate text-sm text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                    {checked ? <Badge>選択中</Badge> : null}
                  </label>
                );
              })
            )}
          </div>
        </ScrollArea>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="size-4" />
          {selectedIds.length} 人選択
        </div>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            キャンセル
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedRoomId || selectedIds.length === 0 || submitting}
          >
            <Mail className="size-4" />
            招待を送信
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default InviteMembersDialog;
