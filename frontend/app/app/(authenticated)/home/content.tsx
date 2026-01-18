"use client";

import AuthenticatedPageTitle from "@/components/atoms/AuthenticatedPageTitle";
import { AppDispatch } from "@/store";
import { queryMeThunk } from "@/store/slices/entity/me-slice";
import { queryRoomsThunk } from "@/store/slices/entity/rooms-slice";
import { queryUsersThunk } from "@/store/slices/entity/users-slice";
import { startEntitySubscriptions } from "@/store/slices/entity/messages-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Content() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // ログインユーザー情報を取得
    dispatch(queryMeThunk());
    // ルーム情報を取得
    dispatch(queryRoomsThunk());
    // ユーザー一覧情報を取得
    dispatch(queryUsersThunk());
    // サブスクリプション購読
    dispatch(startEntitySubscriptions());
  });

  return (
    <>
      <AuthenticatedPageTitle title="ホーム" />
    </>
  );
}
