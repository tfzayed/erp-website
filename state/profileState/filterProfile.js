import { useReducer } from "react";
import profileState from "./profileState";

const filterProfile = () => {
  const {
    profileState: { profiles },
  } = profileState();

  const filterReducer = (state, action) => {
    switch (action.type) {
      case "SINGLE_PROFILE":
        return {
          ...state,
          profiles: profiles.filter((profile) => profile._id === action.id),
        };
      // case "SINGLE_COURSE_ITEM":
      //   return {
      //     ...state,
      //     profiles: profiles
      //       .filter((el) => el._id === action.id)[0]
      //       .course.filter((courseData) => courseData._id === action.courseId),
      //   };

      default:
        return state;
    }
  };
  const initialState = {
    profiles: [],
    // course: [],
  };
  const [filterProfileState, filterProfileDisPatch] = useReducer(
    filterReducer,
    initialState,
  );

  return { filterProfileDisPatch, filterProfileState };
};

export default filterProfile;
