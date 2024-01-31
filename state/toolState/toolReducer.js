export const toolReducer = (state, action) => {
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
        tools: action.payload,
        error: false,
      };
    case "FETCHING_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };

    case "EXPAND_TOOL": {
      return {
        ...state,
        tools: state.tools.map((tool) => {
          return {
            ...tool,
            expand: action.id === tool._id ? action.expand : false,
          };
        }),
      };
    }

    case "ADD_TOOL": {
      return {
        ...state,
        tools: [...state.tools, action.payload],
      };
    }
    case "UPDATE_TOOL":
      return {
        ...state,
        tools: state.tools.map((tool) => {
          if (action.id === tool._id) {
            return {
              ...tool,
              platform: action.payload.platform,
              website: action.payload.website,
              price: action.payload.price,
              email: action.payload.email,
              password: action.payload.password,
              purchase_date: action.payload.purchase_date,
              expire_date: action.payload.expire_date,
              organization: action.payload.organization,
            };
          } else {
            return {
              ...tool,
              platform: tool.platform,
              website: tool.website,
              price: tool.price,
              email: tool.email,
              password: tool.password,
              purchase_date: tool.purchase_date,
              expire_date: tool.expire_date,
              organization: tool.organization,
            };
          }
        }),
      };
    case "DELETE_TOOL":
      return {
        ...state,
        tools: state.tools.filter((tool) => tool._id !== action.id),
      };

    default:
      return state;
  }
};
