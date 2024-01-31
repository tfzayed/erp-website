import { useReducer } from "react";
import userState from "./userState";

const filterUser = () => {
  const {
    userState: { users },
  } = userState();
  const filterReducer = (state, action) => {
    const filterUser = users.filter((user) => user._id === action.id);

    // const multiUsers = users.find((user) => user._id === action.id);
    const multiUsers = action?.org?.map((a) =>
      a.users.map((b) => users.find((user) => user._id === b))
    );

    switch (action.type) {
      case "SINGLE_USER":
        return {
          ...state,
          users: filterUser,
        };
      case "MULTI_USER":
        return {
          ...state,
          users: multiUsers,
        };
      default:
        return state;
    }
  };
  const initialState = {
    users: [],
  };
  const [filterUserState, filterDisPatch] = useReducer(
    filterReducer,
    initialState
  );

  return { filterDisPatch, filterUserState };
};

export default filterUser;
