"use client";

import AuthenticatedPageTitle from "@/components/atoms/AuthenticatedPageTitle";
import Message from "@/components/atoms/Message";
import { CreateMessageMutation } from "@/graphql/graphql";
import { useAppDispatch } from "@/store/hooks";
import { useMutation, } from "@apollo/client/react";
import { queryRoomsThunk, useRoomSelector } from "@/store/slices/entity/rooms-slice";
import gql from "graphql-tag";
import { PlayIcon } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useMeSelector } from "@/store/slices/entity/me-slice";
import { queryMessagesThunk, useMessagesSelector } from "@/store/slices/entity/messages-slice";

interface Props {
  roomId: string;
}

const CreateMessageMutationDocument = gql`
mutation CreateMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
    id
    body
    roomId
    senderId
    createdAt
    updatedAt
  }
}
`;
export default function Content({ roomId }: Props) {

  const [message, setMessage] = useState<string>("");
  const me = useMeSelector();
  const [createMessage,] = useMutation<CreateMessageMutation>(CreateMessageMutationDocument);
  const dispatch = useAppDispatch();
  const messages = useMessagesSelector(roomId);
  const room = useRoomSelector(roomId);

  useEffect(() => {
    dispatch(queryMessagesThunk({ roomId }));
    dispatch(queryRoomsThunk());
  }, [roomId, dispatch]);

  /**
   * メッセージ入力欄変更時処理 
   * @param {FormEvent<HTMLTextAreaElement>} e 
   */
  const handleSendMessageChange = (e: FormEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setMessage(e.currentTarget.value)
  }

  /**
   * メッセージ送信ボタンクリック時処理 
   * @param {FormEvent<HTMLButtonElement>} e 
   */
  const handleSendMessageButtonClick = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createMessage({ variables: { input: { body: message, roomId: room.id, senderId: me.id } } }).catch(console.error);
    setMessage("");
  }

  return (
    <div className="grid grid-rows-[5rem_1fr_4vh] h-full overflow-scroll">
      <AuthenticatedPageTitle title={room.name} />
      <section className="m-4">
        {messages.map((message) => (
          <Message
            senderIconUrl={message.sender.icon}
            senderName={message.sender.name}
            content={message.body}
            sentAt={new Date(message.createdAt).toLocaleString()}
            key={message.id}
          />
        ))}
      </section>
      <section className="h-full w-full">
        <div className="p-2">
          <div className="grid grid-rows[1fr_4vh] h-full">
            <textarea onChange={handleSendMessageChange} value={message} className="border p-2 rounded-[0.5vw] w-full" />
          </div>
          <div className="grid grid-cols-12 mt-2">
            <div className="col-span-11"></div>
            <div className="bg-surface col-span-1 flex justify-end items-center border border-surface rounded-[0.1vw] text-primary hover:cursor-pointer">
              <div className="flex items-center">
                <div>
                  <PlayIcon />
                </div>
                <button type="button" className="text-primary pl-1 pr-2 py-2 font-bold" onClick={handleSendMessageButtonClick}>
                  送信
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
