import Axios from "@/lib/axios";
import { useEffect, useReducer } from "react";
import { profileReducer } from "./profileReducer";

const profileStates = () => {
  const initialState = {
    loading: true,
    profiles: [],
    error: false,
  };
  const [profileState, profileDispatch] = useReducer(
    profileReducer,
    initialState,
  );

  useEffect(() => {
    profileDispatch({
      type: "FETCHING_START",
    });
    Axios.get("profile")
      .then((data) =>
        profileDispatch({
          type: "FETCHING_SUCCESS",
          payload: data.data.result.map((profile) => {
            return { ...profile, expand: false };
          }),
        }),
      )
      .catch(() => profileDispatch({ type: "FETCHING_FAILED" }));
  }, []);

  return {
    profileState: profileState,
    profileDispatch: profileDispatch,
  };
};

export default profileStates;
