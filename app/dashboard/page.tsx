"use client";

import { setAdminFromLocalStorage } from "@/redux/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setAdminFromLocalStorage());
  }, []);
  const stateApp = useAppSelector((state) => state.admin);
  return <div>From Dashboard - {JSON.stringify(stateApp)}</div>;
};

export default DashboardPage;
