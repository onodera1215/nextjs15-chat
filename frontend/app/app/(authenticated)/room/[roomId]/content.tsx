"use client";

import AuthenticatedPageTitle from "@/components/atoms/AuthenticatedPageTitle";
import Message from "@/components/atoms/Message";
import { CreateMessageMutation } from "@/graphql/graphql";
import { useAppDispatch } from "@/store/hooks";
import { useMutation } from "@apollo/client/react";
import {
  queryRoomsThunk,
  useRoomSelector,
} from "@/store/slices/entity/rooms-slice";
import gql from "graphql-tag";
import { PlayIcon } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useOptionalMeSelector } from "@/store/slices/entity/me-slice";
import {
  queryMessagesThunk,
  useMessagesSelector,
} from "@/store/slices/entity/messages-slice";
import {
  cursorEncoder,
  getScrollVerticalPosition,
  toLocalDateString,
} from "@/lib/client/utils";

interface Props {
  roomId: string;
}

const CreateMessageMutationDocument = gql`
  mutation CreateMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      message {
        id
        body
        roomId
        createdAt
        updatedAt
      }
    }
  }
`;
export default function Content({ roomId }: Props) {
  const [message, setMessage] = useState<string>("");
  const me = useOptionalMeSelector();
  const [createMessage] = useMutation<CreateMessageMutation>(
    CreateMessageMutationDocument,
  );
  const dispatch = useAppDispatch();
  const messages = useMessagesSelector(roomId);
  const room = useRoomSelector(roomId);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScrollTop = (e: Event) => {
    const position = getScrollVerticalPosition(e);
    if (["top"].includes(position) && messages.length > 0) {
      const cursor = { id: messages[0].id, createdAt: messages[0].createdAt };
      const encodedCursor = cursorEncoder(cursor);
      console.log("encodedCursor:", encodedCursor);
      dispatch(queryMessagesThunk({ roomId, after: encodedCursor }));
    }
  };

  useEffect(() => {
    dispatch(queryMessagesThunk({ roomId }));
    dispatch(queryRoomsThunk());

    if (contentRef.current) {
      contentRef.current.addEventListener("scroll", handleScrollTop);
    }

    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener("scroll", handleScrollTop);
      }
    };
  }, [roomId, dispatch]);

  /**
   * メッセージ入力欄変更時処理
   * @param {FormEvent<HTMLTextAreaElement>} e
   */
  const handleSendMessageChange = (e: FormEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setMessage(e.currentTarget.value);
  };

  /**
   * メッセージ送信ボタンクリック時処理
   * @param {FormEvent<HTMLButtonElement>} e
   */
  const handleSendMessageButtonClick = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!me || !room || !message.trim()) {
      return;
    }
    createMessage({
      variables: { input: { body: message, roomId: room.id, senderId: me.id } },
    }).catch(console.error);
    setMessage("");
  };

  if (!room) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        ルーム情報を読み込み中です...
      </div>
    );
  }

  return (
    <div
      className="grid grid-rows-[5rem_1fr_4vh] h-full overflow-scroll"
      ref={contentRef}
    >
      <AuthenticatedPageTitle title={room.name} />
      <section className="m-4">
        {messages.map((message) => (
          <Message
            senderIconUrl={message.sender.icon}
            senderName={message.sender.name}
            content={message.body}
            sentAt={toLocalDateString(message.createdAt)}
            key={message.id}
          />
        ))}
      </section>
      <section className="h-full w-full">
        <div className="p-2">
          <div className="grid grid-rows[1fr_4vh] h-full">
            <textarea
              onChange={handleSendMessageChange}
              value={message}
              disabled={!me}
              className="border p-2 rounded-[0.5vw] w-full disabled:opacity-50"
            />
          </div>
          <div className="grid grid-cols-12 mt-2">
            <div className="col-span-11"></div>
            <div className="bg-surface col-span-1 flex justify-center border border-surface rounded-[0.1vw] text-primary">
              <button
                type="button"
                className="text-primary font-bold w-full p-2 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handleSendMessageButtonClick}
                disabled={!me || !message.trim()}
              >
                <div className="flex items-center justify-center">
                  <div>
                    <PlayIcon />
                  </div>
                  <div>送信</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
