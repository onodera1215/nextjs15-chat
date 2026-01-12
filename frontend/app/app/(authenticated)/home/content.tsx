'use client';

import AuthenticatedPageTitle from "@/components/atoms/AuthenticatedPageTitle";
import { AppDispatch } from "@/store";
import { queryMeThunk } from "@/store/entity/entitySlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


export default function Content() {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const promise = dispatch(queryMeThunk())
    return () => {
      promise.abort();
    };
  }, [dispatch]);


  return <>
    <AuthenticatedPageTitle title="ホーム" />
  </>
}