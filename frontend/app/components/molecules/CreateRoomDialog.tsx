import React, { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { PlusSquare } from "lucide-react";

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (payload: {
    name: string;
    description: string;
  }) => Promise<void> | void;
};

export default function CreateRoomDialog({
  open,
  onOpenChange,
  onSubmit,
}: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setName("");
    setDescription("");
    setSubmitting(false);
    setError(null);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      reset();
    }
    onOpenChange?.(nextOpen);
  };

  const handleSubmit = async () => {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName || !trimmedDescription) {
      setError("ルーム名と説明を入力してください。");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await onSubmit?.({
        name: trimmedName,
        description: trimmedDescription,
      });
      handleOpenChange(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "ルームの作成に失敗しました。",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>ルームを作成</DialogTitle>
          <DialogDescription>
            新しいルーム名と説明を入力して、チームの会話場所を追加します。
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="room-name">ルーム名</Label>
            <Input
              id="room-name"
              placeholder="例: frontend-team"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={50}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="room-description">説明</Label>
            <Input
              id="room-description"
              placeholder="例: フロントエンド開発の相談・連絡用"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              maxLength={120}
            />
          </div>
        </div>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            キャンセル
          </Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            <PlusSquare className="size-4" />
            作成する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
