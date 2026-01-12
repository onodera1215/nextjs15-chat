"use client";

import AuthenticatedPageTitle from "@/components/atoms/AuthenticatedPageTitle";
import { AppDispatch } from "@/store";
import { queryMeThunk, queryRoomsThunk } from "@/store/entity/entitySlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Content() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // ログインユーザー情報を取得
    dispatch(queryMeThunk());
    // ルーム情報を取得
    dispatch(queryRoomsThunk());
  }, [dispatch]);

  return (
    <>
      <AuthenticatedPageTitle title="ホーム" />
    </>
  );
}
