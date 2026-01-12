"use client";

import AuthenticatedPageTitle from "@/components/atoms/AuthenticatedPageTitle";
import { Loading } from "@/components/atoms/Loading";
import { CreateMessageMutation, GetRoomQuery } from "@/graphql/graphql";
import { useMeSelector } from "@/store/entity/entitySlice";
import { useMutation, useQuery } from "@apollo/client/react";
import { create } from "domain";
import gql from "graphql-tag";
import { PlayIcon } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";

interface Props {
  roomId: string;
}

const RoomQueryDocument = gql`
  query GetRoom($id: String!) {
    room(id: $id) {
      id
      name
    }
  }
`;

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
  const { data: roomData, loading } = useQuery<GetRoomQuery>(RoomQueryDocument, { variables: { id: roomId } });
  const { me } = useMeSelector();
  const [createMessage,] = useMutation<CreateMessageMutation>(CreateMessageMutationDocument);


  if (loading) {
    return <Loading />;
  }

  if (!roomData?.room.id || !roomData?.room.name) {
    throw new Error("ルームが見つかりません");
  }
  const { room } = roomData;

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
    console.log("me:", me);
    createMessage({ variables: { input: { body: message, roomId: room.id, senderId: me?.id } } }).catch(console.error);
  }

  return (
    <div className="grid grid-rows-[5rem_1fr_4vh] h-full overflow-scroll">
      <AuthenticatedPageTitle title={room.name} />
      <section className="m-4">
        <section className="border border-gray-300 rounded-lg p-4 mb-4">
          <div className="flex justify-start items-center">
            <div>
              <Image
                width={30}
                height={0}
                sizes="100vw"
                style={{ height: "auto" }}
                src="data:image/jpeg;base64,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"
                alt="アイコン"
              />
            </div>
            <div className="text-sm ml-2">送信者名</div>
            <div className="text-sm ml-2">2025/07/31 12:34</div>
            <hr className="my-4 border-t border-gray-400" />
          </div>
          <article>
            <p className="text-sm">
              ここにメッセージ内容が入ります。長い場合は自動で改行されます。
            </p>
          </article>
        </section>
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
