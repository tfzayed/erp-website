"use client";

import { dateInput } from "@/lib/dateInput";
import { X } from "lucide-react";
import { useState } from "react";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import { DialogContent, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";

const CalendarForm = ({
  calendar,
  setCalendar,
  handleSubmit,
  years,
  year,
  setYear,
}) => {
  const [selectedValue, setSelectedValue] = useState([
    { value: year, label: year },
  ]);

  // holidays
  const addHoliday = () => {
    setCalendar({
      ...calendar,
      holidays: [
        ...calendar.holidays,
        {
          id: calendar?.holidays?.id ? calendar?.holidays?.id : uuidv4(),
          start_date: Date,
          end_date: Date,
          reason: "",
        },
      ],
    });
  };
  const deleteHoliday = (id) => {
    if (calendar.holidays.map((day) => day.id).includes(id)) {
      setCalendar({
        ...calendar,
        holidays: calendar.holidays.filter((day) => day.id !== id),
      });
    }
  };

  // events
  const addEvent = () => {
    setCalendar({
      ...calendar,
      events: [
        ...calendar.events,
        {
          id: calendar?.events?.id ? calendar?.events?.id : uuidv4(),
          start_date: Date,
          end_date: Date,
          reason: "",
        },
      ],
    });
  };
  const deleteEvent = (id) => {
    if (calendar.events.map((day) => day.id).includes(id)) {
      setCalendar({
        ...calendar,
        events: calendar.events.filter((day) => day.id !== id),
      });
    }
  };

  return (
    <DialogContent className="overflow-y-scroll max-h-[80%] min-w-[80%]">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          {year && setYear ? (
            <div className="grid grid-cols-4 items-center">
              <label htmlFor="year" className="h4">
                Year
              </label>
              <Select
                value={selectedValue}
                isSearchable={false}
                options={years}
                onChange={(value) => (
                  setSelectedValue(value), setYear(value.value)
                )}
                menuPlacement="auto"
                className="col-span-12"
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
              />
            </div>
          ) : (
            <div className="grid grid-cols-12 items-center justify-center ">
              <label htmlFor="year" className="h4">
                Year<span className="text-red-500">*</span>
              </label>
              <Input
                required
                id="year"
                type="number"
                placeholder="year"
                value={calendar.year ? calendar.year : ""}
                onChange={(e) =>
                  setCalendar({ ...calendar, year: e.target.value })
                }
                className="col-span-12"
              />
            </div>
          )}

          <div className="grid grid-cols-8 gap-4">
            {/* Column for Holidays */}
            <div className="col-span-4">
              <h4 className="mb-4">Holidays</h4>
              {calendar.holidays &&
                calendar.holidays.map((day, i) => (
                  <div key={i} className="expand_border grid gap-4 p-4 mb-5">
                    <X
                      onClick={() => deleteHoliday(day.id)}
                      size={16}
                      className="text-red-500 absolute right-1 top-1 cursor-pointer"
                    />
                    {calendar.holidays && (
                      <>
                        <div>
                          <label htmlFor="reason">
                            Reason<span className="text-red-500">*</span>
                          </label>
                          <Input
                            required
                            type="text"
                            id="reason"
                            placeholder="reason"
                            value={day.reason ? day.reason : ""}
                            onChange={(e) =>
                              setCalendar({
                                ...calendar,
                                holidays: calendar.holidays.map((el) => {
                                  return {
                                    ...el,
                                    reason:
                                      day.id === el.id
                                        ? e.target.value
                                        : el.reason,
                                  };
                                }),
                              })
                            }
                          />
                        </div>
                        {/* start date */}
                        <div>
                          <label htmlFor="holidays-start-day">
                            Start<span className="text-red-500">*</span>
                          </label>
                          <Input
                            required
                            type="date"
                            id="holidays-start-day"
                            placeholder="start day"
                            value={dateInput(day.start_date)}
                            onChange={(e) =>
                              setCalendar({
                                ...calendar,
                                holidays: calendar.holidays.map((el) => {
                                  return {
                                    ...el,
                                    start_date:
                                      day.id === el.id
                                        ? e.target.value
                                        : el.start_date,
                                  };
                                }),
                              })
                            }
                          />
                        </div>
                        {/* end date */}
                        <div>
                          <label htmlFor="end-day">
                            End<span className="text-red-500">*</span>
                          </label>
                          <Input
                            required
                            type="date"
                            id="end-day"
                            placeholder="end day"
                            value={dateInput(day.end_date)}
                            onChange={(e) =>
                              setCalendar({
                                ...calendar,
                                holidays: calendar.holidays.map((el) => {
                                  return {
                                    ...el,
                                    end_date:
                                      day.id === el.id
                                        ? e.target.value
                                        : el.end_date,
                                  };
                                }),
                              })
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              <Button
                type="button"
                className="w-full expand_border grid gap-4 bg-background text-text-color"
                onClick={addHoliday}
              >
                Add Holiday
              </Button>
            </div>

            {/* Column for Events */}
            <div className="col-span-4">
              <h4 className="mb-4">Events</h4>
              {calendar.events &&
                calendar.events.map((day, i) => (
                  <div key={i} className="expand_border grid gap-4 p-4 mb-5">
                    <X
                      onClick={() => deleteEvent(day.id)}
                      size={16}
                      className="text-red-500 absolute right-1 top-1 cursor-pointer"
                    />
                    {calendar.events && (
                      <>
                        <div>
                          <label htmlFor="reason">
                            Reason<span className="text-red-500">*</span>
                          </label>
                          <Input
                            required
                            type="text"
                            id="reason"
                            placeholder="reason"
                            value={day.reason ? day.reason : ""}
                            onChange={(e) =>
                              setCalendar({
                                ...calendar,
                                events: calendar.events.map((el) => {
                                  return {
                                    ...el,
                                    reason:
                                      day.id === el.id
                                        ? e.target.value
                                        : el.reason,
                                  };
                                }),
                              })
                            }
                          />
                        </div>
                        {/* start date */}
                        <div>
                          <label htmlFor="events-start-day">
                            Start<span className="text-red-500">*</span>
                          </label>
                          <Input
                            required
                            type="date"
                            id="events-start-day"
                            placeholder="start day"
                            value={dateInput(day.start_date)}
                            onChange={(e) =>
                              setCalendar({
                                ...calendar,
                                events: calendar.events.map((el) => {
                                  return {
                                    ...el,
                                    start_date:
                                      day.id === el.id
                                        ? e.target.value
                                        : el.start_date,
                                  };
                                }),
                              })
                            }
                          />
                        </div>
                        {/* end date */}
                        <div>
                          <label htmlFor="end-day">
                            End<span className="text-red-500">*</span>
                          </label>
                          <Input
                            required
                            type="date"
                            id="end-day"
                            placeholder="end day"
                            value={dateInput(day.end_date)}
                            onChange={(e) =>
                              setCalendar({
                                ...calendar,
                                events: calendar.events.map((el) => {
                                  return {
                                    ...el,
                                    end_date:
                                      day.id === el.id
                                        ? e.target.value
                                        : el.end_date,
                                  };
                                }),
                              })
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              <Button
                type="button"
                className="w-full expand_border grid gap-4 bg-background text-text-color"
                onClick={addEvent}
              >
                Add Event
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter className="w-[30%] mx-auto">
          <Button type="submit" className="w-full">
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default CalendarForm;
