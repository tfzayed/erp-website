"use client";

import AddCalendars from "@/component/calendar/AddCalenders";
import CalendarTable from "@/component/calendar/CalendarTable";
import CustomCalendar from "@/component/calendar/CustomCalendar";
import UpdateCalendar from "@/component/calendar/UpdateCalendar";
import { useAppContext } from "app/provider";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default function Calendar({ admin }) {
  const {
    calendarState: { calendar },
  } = useAppContext();

  const currentYear = calendar.filter(
    (cal) => new Date().getFullYear() === cal?.year
  );

  let events = currentYear.map((a) => [
    ...a.holidays.map((holiday) => ({
      title: holiday.reason,
      start: holiday.start_date,
      end: holiday.end_date,
      total: holiday.day_count,
      bgColor: "red",
    })),
    ...a.events.map((event) => ({
      title: event.reason,
      start: event.start_date,
      end: event.end_date,
      total: event.day_count,
      bgColor: "blue",
    })),
  ]);

  return (
    <>
      {admin && (
        <>
          <AddCalendars />
          <UpdateCalendar calendars={calendar} />
        </>
      )}

      <CustomCalendar events={events[0]} />

      {currentYear[0]?.holidays.length > 0 && (
        <CalendarTable
          reason={"Holidays"}
          calendar={currentYear[0]?.holidays}
        />
      )}

      {currentYear[0]?.events.length && (
        <CalendarTable reason={"Events"} calendar={currentYear[0]?.events} />
      )}
    </>
  );
}
