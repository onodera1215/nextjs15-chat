"use client";

import AuthenticatedPageTitle from "@/components/atoms/AuthenticatedPageTitle";
import { Button } from "@/components/ui/button";
import { queryAvailableRoomsThunk, queryRoomsThunk } from "@/store/slices/entity/rooms-slice";
import { useAppDispatch } from "@/store/hooks";
import { useMutation, useQuery } from "@apollo/client/react";
import gql from "graphql-tag";
import { BellRing, Check, Clock3, Inbox } from "lucide-react";
import { toLocalDateString } from "@/lib/client/utils";
import { useState } from "react";

type InvitationItem = {
  id: string;
  roomId: string;
  roomName: string;
  inviterName: string;
  expiresAt: string;
  createdAt: string;
};

type MyInvitationsQuery = {
  myInvitations: InvitationItem[];
};

type AcceptInvitationMutation = {
  acceptInvitation: {
    room: {
      id: string;
    };
  };
};

const MyInvitationsQueryDocument = gql`
  query MyInvitations {
    myInvitations {
      id
      roomId
      roomName
      inviterName
      expiresAt
      createdAt
    }
  }
`;

const AcceptInvitationMutationDocument = gql`
  mutation AcceptInvitation($input: AcceptInvitationInput!) {
    acceptInvitation(input: $input) {
      room {
        id
      }
    }
  }
`;

export default function Content() {
  const dispatch = useAppDispatch();
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data, loading, refetch } = useQuery<MyInvitationsQuery>(
    MyInvitationsQueryDocument,
    {
      fetchPolicy: "no-cache",
    },
  );
  const [acceptInvitation] = useMutation<AcceptInvitationMutation>(
    AcceptInvitationMutationDocument,
  );

  const invitations = data?.myInvitations ?? [];

  const handleAccept = async (invitationId: string) => {
    setSubmittingId(invitationId);
    setError(null);

    try {
      await acceptInvitation({
        variables: {
          input: {
            invitationId,
          },
        },
      });
      await refetch();
      dispatch(queryRoomsThunk());
      dispatch(queryAvailableRoomsThunk());
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "招待の承認に失敗しました。",
      );
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <div className="px-4 pb-6">
      <AuthenticatedPageTitle title="ホーム" />
      <section className="rounded-2xl border bg-background p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <BellRing className="size-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">招待一覧</h2>
            <p className="text-sm text-muted-foreground">
              自分宛てに届いている未使用の招待を確認できます。
            </p>
          </div>
        </div>

        {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}

        {loading ? (
          <div className="py-10 text-sm text-muted-foreground">
            招待を読み込み中です...
          </div>
        ) : invitations.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-12 text-center text-muted-foreground">
            <Inbox className="size-10" />
            <div>
              <p className="font-medium text-foreground">未使用の招待はありません</p>
              <p className="text-sm">新しい招待が届くとここに表示されます。</p>
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {invitations.map((invitation) => (
              <div
                key={invitation.id}
                className="rounded-xl border bg-card p-4 shadow-sm"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-2">
                    <p className="text-base font-semibold">{invitation.roomName}</p>
                    <p className="text-sm text-muted-foreground">
                      {invitation.inviterName} さんからの招待
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock3 className="size-4" />
                      有効期限: {toLocalDateString(new Date(invitation.expiresAt))}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleAccept(invitation.id)}
                    disabled={submittingId === invitation.id}
                  >
                    <Check className="size-4" />
                    参加する
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
