"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation } from "@apollo/client/react";
import gql from "graphql-tag";
import { RoomRole } from "@/graphql/graphql";
import Content from "../molecules/Content";
import Sidebar from "../molecules/Sidebar";
import AddRoomDialog from "../molecules/AddRoomDialog";
import InviteMembersDialog from "../molecules/AddMemberDialog";
import { useAppDispatch } from "@/store/hooks";
import {
  queryMeThunk,
  useOptionalMeSelector,
} from "@/store/slices/entity/me-slice";
import {
  queryAvailableRoomsThunk,
  queryRoomsThunk,
  useJoinedRoomsSelector,
  useUnjoinedRoomsSelector,
} from "@/store/slices/entity/rooms-slice";
import {
  queryUsersThunk,
  useUsersSelector,
} from "@/store/slices/entity/users-slice";
import { startEntitySubscriptions } from "@/store/slices/entity/messages-slice";

const JoinRoomMutationDocument = gql`
  mutation JoinRoom($input: JoinRoomInput!) {
    joinRoom(input: $input) {
      room {
        id
      }
    }
  }
`;

const CreateInvitationMutationDocument = gql`
  mutation CreateInvitation($input: CreateInvitationInput!) {
    createInvitation(input: $input) {
      invitation {
        id
      }
    }
  }
`;

export default function ClientComponentsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const me = useOptionalMeSelector();
  const joinedRooms = useJoinedRoomsSelector();
  const unjoinedRooms = useUnjoinedRoomsSelector();
  const users = useUsersSelector();
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [joinRoom] = useMutation(JoinRoomMutationDocument);
  const [createInvitation] = useMutation(CreateInvitationMutationDocument);

  useEffect(() => {
    dispatch(queryMeThunk());
    dispatch(queryRoomsThunk());
    dispatch(queryAvailableRoomsThunk());
    dispatch(queryUsersThunk());
    dispatch(startEntitySubscriptions());
  }, [dispatch]);

  const inviteCandidates = useMemo(() => {
    return users.allIds
      .map((id) => users.byId[id])
      .filter((user) => user && user.id !== me?.id)
      .map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      }));
  }, [me?.id, users.allIds, users.byId]);

  const handleJoinRoom = async ({ roomId }: { roomId: string }) => {
    await joinRoom({
      variables: {
        input: {
          roomId,
          roomRoleId: RoomRole.RoomMember,
        },
      },
    });

    dispatch(queryRoomsThunk());
    dispatch(queryAvailableRoomsThunk());
  };

  const handleInviteMembers = async ({
    roomId,
    inviteeIds,
  }: {
    roomId: string;
    inviteeIds: string[];
  }) => {
    for (const inviteeUserId of inviteeIds) {
      await createInvitation({
        variables: {
          input: {
            roomId,
            inviteeUserId,
          },
        },
      });
    }
  };

  return (
    <>
      <AddRoomDialog
        open={isJoinDialogOpen}
        onOpenChange={setIsJoinDialogOpen}
        rooms={unjoinedRooms.map((room) => ({
          id: room.id,
          name: room.name,
          description: room.description,
        }))}
        onSubmit={handleJoinRoom}
      />
      <InviteMembersDialog
        open={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
        rooms={joinedRooms.map((room) => ({ id: room.id, name: room.name }))}
        candidates={inviteCandidates}
        onSubmit={handleInviteMembers}
      />
      <div className="grid grid-cols-12">
        <div className="hidden bg-surface lg:col-span-3 lg:block">
          <Sidebar
            onAddChannelButtonClick={() => setIsJoinDialogOpen(true)}
            onAddUserButtonClick={() => setIsInviteDialogOpen(true)}
          />
        </div>
        <div className="col-span-12 block lg:col-span-9">
          <Content>{children}</Content>
        </div>
      </div>
    </>
  );
}
