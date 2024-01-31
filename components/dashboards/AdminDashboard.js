"use client";

import { useAppContext } from "app/provider";
import { useMemo } from "react";
import DashboardTable from "./DashboardTable";

export default function AdminDashboard() {
  const {
    userState: { users },
    toolState: { tools },
    courseState: { courses },
    profileState: { profiles },
    assetState: { assets },
  } = useAppContext();

  const sumTotal = (array) => {
    const totalTools = array.reduce(
      (prev, current) => prev + Number(current.price),
      0
    );
    return totalTools;
  };
  // calculate total tools cost
  const totalTools = useMemo(() => {
    return sumTotal(tools);
  }, [tools]);
  // calculate total course cost
  const totalCourses = useMemo(() => {
    return sumTotal(courses.map((data) => data.course).flat());
  }, [courses]);
  // calculate total profiles cost
  const totalProfiles = useMemo(() => {
    return sumTotal(profiles.map((data) => data.profiles).flat());
  }, [profiles]);
  // calculate total assets cost
  const totalAssets = useMemo(() => {
    return sumTotal(assets);
  }, [assets]);

  return (
    <>
      {/* tools pricing table */}
      <DashboardTable
        total={totalTools}
        name="Tool"
        priceHead="Price /mo"
        data={tools}
      />
      {/* profiles pricing table */}
      <DashboardTable
        total={totalProfiles}
        name="Profile"
        priceHead="Price /mo"
        data={profiles.map((data) => data.profiles).flat()}
      />
      {/* course pricing table */}
      <DashboardTable
        total={totalCourses}
        name="Course"
        priceHead="Price"
        data={courses.map((data) => data.course).flat()}
      />
      {/* tools pricing table */}
      <DashboardTable
        total={totalAssets}
        name="Asset"
        priceHead="Price"
        data={assets}
      />
    </>
  );
}
