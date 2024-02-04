"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment";
import { Calendar, Navigate, momentLocalizer } from "react-big-calendar";

const CustomToolbar = (props) => {
  const goToBack = () => {
    props.onNavigate(Navigate.PREVIOUS);
  };
  const goToNext = () => {
    props.onNavigate(Navigate.NEXT);
  };
  const goToToday = () => {
    props.onNavigate(Navigate.TODAY);
  };

  return (
    <div className="flex md:flex-col lg:flex-row justify-between items-center mb-5">
      <h3 className="max-lg:mb-4">{props.label}</h3>
      <div className="flex items-center border rounded-md p-1">
        <button onClick={goToBack}>
          <ChevronLeft />
        </button>
        <button className="mx-5" onClick={goToToday}>
          Today
        </button>
        <button onClick={goToNext}>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

const eventStyleGetter = (events) => {
  const backgroundColor = events.bgColor ? events.bgColor : "black";
  const color = events.color ? events.color : "white";
  const style = {
    backgroundColor,
    color,
    borderRadius: "8px",
  };
  return { style };
};

const CustomCalendar = ({ events }) => {
  const localizer = momentLocalizer(moment);
  return (
    <Calendar
      localizer={localizer}
      events={events}
      views={{ month: true }}
      startAccessor="start"
      endAccessor="end"
      components={{
        toolbar: CustomToolbar,
      }}
      style={{
        height: 500,
        width: "100%",
        marginBottom: "20px",
      }}
      eventPropGetter={eventStyleGetter}
    />
  );
};

export default CustomCalendar;
