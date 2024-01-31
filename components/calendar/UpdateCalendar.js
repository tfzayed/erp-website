"use client";

import { useAppContext } from "@/app/provider";
import Axios from "@/lib/axios";
import CalendarForm from "components/form/CalendarForm";
import { differenceInDays, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";

const UpdateCalendar = ({ calendars }) => {
  const { calendarDispatch, toastDispatch } = useAppContext();

  const [year, setYear] = useState(new Date().getFullYear());

  const [updatedCalendar, setUpdatedCalendar] = useState({});

  const years = calendars
    ?.map((cal) => [{ value: cal.year, label: cal.year }])
    .flat();

  const selectedYear = calendars.filter((cal) => year === cal?.year);

  useEffect(() => {
    setUpdatedCalendar({
      year: selectedYear[0]?.year,
      holidays: selectedYear[0]?.holidays,
      events: selectedYear[0]?.events,
    });
  }, [selectedYear[0]]);

  //   reset updatedCalendar
  const reset = () => {
    setUpdatedCalendar({
      ...updatedCalendar,
      year: updatedCalendar?.year,
      holidays: [
        {
          id: updatedCalendar?.holidays?.id,
          start_date: updatedCalendar?.holidays?.start_date,
          end_date: updatedCalendar?.holidays?.end_date,
          day_count: updatedCalendar?.holidays?.day_count,
          reason: updatedCalendar?.holidays?.reason,
        },
      ],
      events: [
        {
          id: updatedCalendar?.events.id,
          start_date: updatedCalendar?.events.start_date,
          end_date: updatedCalendar?.events.end_date,
          day_count: updatedCalendar?.events.day_count,
          reason: updatedCalendar?.events.reason,
        },
      ],
    });
  };

  const calculateDaysOff = (day) => {
    if (day.start_date && day.end_date) {
      const startDate = parseISO(day.start_date);
      const endDate = parseISO(day.end_date);
      return differenceInDays(endDate, startDate) + 1;
    }
  };

  const [open, setOpen] = useState(false);

  //   update updatedCalendar
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedCalendarData = {
      ...updatedCalendar,
      holidays: updatedCalendar.holidays.map((day) => ({
        ...day,
        day_count: calculateDaysOff(day),
      })),
      events: updatedCalendar.events.map((day) => ({
        ...day,
        day_count: calculateDaysOff(day),
      })),
    };

    const res = await Axios.patch(
      `calendar/${selectedYear[0]?._id}`,
      updatedCalendarData
    );

    if (res.status === 200) {
      reset();
      setOpen(false);
      calendarDispatch({
        type: "UPDATE_CALENDARS",
        payload: updatedCalendarData,
        id: selectedYear[0]?._id,
      });
      toastDispatch({
        type: "TOAST",
        message: "Update Successfully",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-5">
          Update Calendar
        </Button>
      </DialogTrigger>
      <CalendarForm
        handleSubmit={handleUpdate}
        calendar={updatedCalendar}
        setCalendar={setUpdatedCalendar}
        years={years}
        year={year}
        setYear={setYear}
      />
    </Dialog>
  );
};

export default UpdateCalendar;
