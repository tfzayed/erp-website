"use client";

import assetsState from "@/state/assetState/assetState";
import filterAssets from "@/state/assetState/filterAsset";
import calendarsState from "@/state/calendarState/calendarState";
import coursesState from "@/state/courseState/courseState";
import filterCourses from "@/state/courseState/filterCourses";
import filterProfile from "@/state/profileState/filterProfile";
import profileStates from "@/state/profileState/profileState";
import toastReducer from "@/state/toastReducer";
import filterOrganization from "@/state/toolState/filterOrganization";
import toolsState from "@/state/toolState/toolState";
import filterUser from "@/state/userState/filterUser";
import userStates from "@/state/userState/userState";
import { AppContext } from "app/context";
import { useContext } from "react";

export const AppWrapper = ({ children }) => {
  // user state
  const { userState, userDispatch } = userStates();
  const { filterUserState, filterDisPatch } = filterUser(userState.users);
  // tool state
  const { toolState, toolDispatch } = toolsState();
  const { filterOrganizationState, filterOrganizationDisPatch } =
    filterOrganization(toolState.tools);
  // course state
  const { courseState, courseDispatch } = coursesState();
  const { filterCoursesState, filterCoursesDisPatch } = filterCourses(
    courseState.courses
  );
  // profile state
  const { profileState, profileDispatch } = profileStates();
  const { filterProfileDisPatch, filterProfileState } = filterProfile(
    profileState.profiles
  );
  // asset state
  const { assetState, assetDispatch } = assetsState();
  const { filterAssetsDisPatch, filterAssetsState } = filterAssets();
  // calendar state
  const { calendarState, calendarDispatch } = calendarsState();
  //  toast
  const { toastDispatch, toastState } = toastReducer();

  // all state
  let state = {
    // users
    userState,
    userDispatch,
    // for single user
    filterUserState,
    filterDisPatch,
    // tools
    toolState,
    toolDispatch,
    // for single organization
    filterOrganizationState,
    filterOrganizationDisPatch,
    // course
    courseState,
    courseDispatch,
    // for single course
    filterCoursesState,
    filterCoursesDisPatch,
    // profile data
    profileDispatch,
    profileState,
    filterProfileDisPatch,
    filterProfileState,
    // assets
    assetState,
    assetDispatch,
    // filter asset
    filterAssetsDisPatch,
    filterAssetsState,
    // calendarDispatch
    calendarState,
    calendarDispatch,
    // toast
    toastDispatch,
    toastState,
  };
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
