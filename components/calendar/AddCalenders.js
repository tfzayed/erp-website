"use client";

import { useAppContext } from "@/app/provider";
import Axios from "@/lib/axios";
import CalendarForm from "components/form/CalendarForm";
import { differenceInDays, parseISO } from "date-fns";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";

const AddCalendars = () => {
  const { calendarDispatch, toastDispatch } = useAppContext();
  const [calendar, setCalendar] = useState({
    year: "",
    holidays: [
      {
        id: uuidv4(),
        start_date: Date,
        end_date: Date,
        day_count: "",
        reason: "",
      },
    ],
    events: [
      {
        id: uuidv4(),
        start_date: Date,
        end_date: Date,
        day_count: "",
        reason: "",
      },
    ],
  });

  const reset = () => {
    setCalendar({
      ...calendar,
      year: "",
      holidays: [
        {
          id: uuidv4(),
          start_date: Date,
          end_date: Date,
          day_count: "",
          reason: "",
        },
      ],
      events: [
        {
          id: uuidv4(),
          start_date: Date,
          end_date: Date,
          day_count: "",
          reason: "",
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

  //   add cal
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedCalendar = {
      ...calendar,
      holidays: calendar.holidays.map((day) => ({
        ...day,
        day_count: calculateDaysOff(day),
      })),
      events: calendar.events.map((day) => ({
        ...day,
        day_count: calculateDaysOff(day),
      })),
    };

    const res = await Axios.post("calendar", updatedCalendar);
    if (res.status === 200) {
      reset();
      setOpen(false);

      if (res.data.result) {
        calendarDispatch({
          type: "ADD_CALENDAR",
          payload: updatedCalendar,
        });
        toastDispatch({
          type: "TOAST",
          message: "ADD Successfully",
        });
      } else {
        toastDispatch({
          type: "TOAST",
          message: "Year Calendar Already Exist",
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-5 mr-4">
          Add Calendar
        </Button>
      </DialogTrigger>
      <CalendarForm
        calendar={calendar}
        setCalendar={setCalendar}
        handleSubmit={handleSubmit}
      />
    </Dialog>
  );
};

export default AddCalendars;
