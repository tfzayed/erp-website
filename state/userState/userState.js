import Axios from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useEffect, useReducer } from "react";
import { userReducer } from "state/userState/userReducer";

const userStates = () => {
  const { data: session } = useSession();

  const initialState = {
    loading: true,
    users: [],
    error: false,
  };

  const [userState, userDispatch] = useReducer(userReducer, initialState);
  useEffect(() => {
    userDispatch({
      type: "FETCHING_START",
    });
    if (session?.user?.email) {
      Axios.get("user", {
        params: {
          email: session?.user?.email,
        },
      })
        .then((data) =>
          userDispatch({
            type: "FETCHING_SUCCESS",
            payload: data.data.result.map((user) => {
              return { ...user, expand: false };
            }),
          })
        )
        .catch(() => userDispatch({ type: "FETCHING_FAILED" }));
    }
  }, [session?.user?.email]);

  return {
    userState: userState,
    userDispatch: userDispatch,
  };
};

export default userStates;
