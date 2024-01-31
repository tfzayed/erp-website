export const calendarReducer = (state, action) => {
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
        calendar: action.payload,
        error: false,
      };
    case "FETCHING_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };

    case "EXPAND_ASSET": {
      return {
        ...state,
        calendar: state.calendar.map((asset) => {
          return {
            ...asset,
            expand: action.id === asset._id ? action.expand : false,
          };
        }),
      };
    }

    case "ADD_CALENDAR": {
      return {
        ...state,
        calendar: [...state.calendar, action.payload],
      };
    }
    case "UPDATE_CALENDARS":
      return {
        ...state,
        calendar: state.calendar.map((cal) => {
          if (action.id === cal._id) {
            return {
              ...cal,
              year: action?.payload?.year,
              holidays: action.payload.holidays,
              events: action.payload.events,
            };
          } else {
            return {
              ...cal,
              year: cal.year,
              holidays: [
                ...cal.holidays,
                {
                  id: cal.holidays?.id,
                  start_date: cal.holidays?.start_date,
                  end_date: cal.holidays?.end_date,
                  day_count: cal.holidays?.day_count,
                  reason: cal.holidays?.reason,
                },
              ],
              events: [
                ...cal.events,
                {
                  id: cal.events.id,
                  start_date: cal.events.start_date,
                  end_date: cal.events.end_date,
                  day_count: cal.events.day_count,
                  reason: cal.events.reason,
                },
              ],
            };
          }
        }),
      };
    case "DELETE_ASSETS":
      return {
        ...state,
        calendar: state.calendar.filter((cal) => cal._id !== action.id),
      };
    default:
      return state;
  }
};
