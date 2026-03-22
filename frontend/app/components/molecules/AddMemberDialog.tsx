import React, { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { UserPlus, Mail, Users } from "lucide-react";

export type Invitee = {
  id: string;
  name: string;
  email: string;
};

export type InviteRole = "member" | "admin";

type Props = {
  roomName: string;
  candidates: Invitee[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (payload: { inviteeIds: string[]; role: InviteRole; message: string }) => Promise<void> | void;
};

export function InviteMembersDialog({ roomName, candidates, open, onOpenChange, onSubmit }: Props) {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [role, setRole] = useState<InviteRole>("member");
  const [message, setMessage] = useState(`こんにちは！${roomName} に参加しませんか？`);
  const [submitting, setSubmitting] = useState(false);

  const filtered = useMemo(() => {
    const k = search.toLowerCase();
    return candidates.filter((u) => u.name.toLowerCase().includes(k) || u.email.toLowerCase().includes(k));
  }, [search, candidates]);

  const toggle = (id: string, checked: boolean) => {
    setSelectedIds((prev) => (checked ? [...new Set([...prev, id])] : prev.filter((v) => v !== id)));
  };

  const handleSubmit = async () => {
    if (!selectedIds.length) return;
    setSubmitting(true);
    await onSubmit?.({ inviteeIds: selectedIds, role, message });
    setSubmitting(false);
    onOpenChange?.(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> 招待
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[680px]">
        <DialogHeader>
          <DialogTitle>ユーザーを招待</DialogTitle>
          <DialogDescription>{roomName} にメンバーを追加</DialogDescription>
        </DialogHeader>

        <Input placeholder="検索" value={search} onChange={(e) => setSearch(e.target.value)} />

        <div className="grid sm:grid-cols-2 gap-4">
          <Input value={message} onChange={(e) => setMessage(e.target.value)} />
          <Select value={role} onValueChange={(v: InviteRole) => setRole(v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="member">メンバー</SelectItem>
              <SelectItem value="admin">管理者</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ScrollArea className="h-[300px] border rounded">
          {filtered.map((u) => {
            const checked = selectedIds.includes(u.id);
            return (
              <label key={u.id} className="flex items-center gap-2 p-2 hover:bg-muted">
                <Checkbox checked={checked} onCheckedChange={(v) => toggle(u.id, Boolean(v))} />
                <Avatar><AvatarFallback>{u.name.slice(0, 2)}</AvatarFallback></Avatar>
                <div className="flex-1">
                  <div>{u.name}</div>
                  <div className="text-xs text-muted-foreground">{u.email}</div>
                </div>
                {checked && <Badge>選択</Badge>}
              </label>
            );
          })}
        </ScrollArea>

        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <Users className="h-4 w-4" /> {selectedIds.length} 人選択
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange?.(false)}>キャンセル</Button>
          <Button onClick={handleSubmit} disabled={!selectedIds.length || submitting}>
            <Mail className="mr-2 h-4 w-4" /> 送信
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
