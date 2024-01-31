export const profileReducer = (state, action) => {
  switch (action.type) {
    case "FETCHING_START":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "FETCHING_SUCCESS":
      return {
        ...state,
        loading: false,
        profiles: action.payload,
        error: false,
      };
    case "FETCHING_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "EXPAND_PROFILE": {
      return {
        ...state,
        profiles: state.profiles.map((profile) => {
          return {
            ...profile,
            expand: action.id === profile._id ? action.expand : false,
          };
        }),
      };
    }

    case "ADD_PROFILE": {
      return {
        ...state,
        profiles: [...state.profiles, action.payload],
      };
    }
    case "UPDATE_PROFILE":
      return {
        ...state,
        profiles: state.profiles.map((profile) => {
          if (action.id === profile._id) {
            return {
              ...profile,
              platfrom: action.payload.platfrom,
              website: action.payload.website,
              profiles: action.payload.profiles,
            };
          } else {
            return {
              ...profile,
              platfrom: profile.platfrom,
              website: profile.website,
              profiles: profile.profiles,
            };
          }
        }),
      };
    case "DELETE_PROFILE":
      return {
        ...state,
        profiles: state.profiles.filter((profile) => profile._id !== action.id),
      };

    default:
      return state;
  }
};
