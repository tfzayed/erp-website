import Axios from "@/lib/axios";
import { useEffect, useReducer } from "react";
import { calendarReducer } from "./calendarReducer";

const calendarState = () => {
  const initialState = {
    loading: true,
    calendar: [],
    error: false,
  };

  const [calendarState, calendarDispatch] = useReducer(
    calendarReducer,
    initialState
  );
  
  useEffect(() => {
    calendarDispatch({
      type: "FETCHING_START",
    });
    Axios.get("calendar")
      .then((data) =>
        calendarDispatch({
          type: "FETCHING_SUCCESS",
          payload: data.data.result.map((cal) => {
            return { ...cal, expand: false };
          }),
        })
      )
      .catch(() => calendarDispatch({ type: "FETCHING_FAILED" }));
  }, []);
  return {
    calendarState: calendarState,
    calendarDispatch: calendarDispatch,
  };
};

export default calendarState;
