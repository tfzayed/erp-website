"use client";

import { useAppContext } from "@/app/provider";
import { Input } from "@/components/ui/input";
import { dateInput } from "@/lib/dateInput";
import { X } from "lucide-react";
import { useState } from "react";
import Select from "react-select";
import { v4 as uuid4 } from "uuid";
import { userGroups } from "../UserList";
import { Button } from "../ui/button";
import { DialogContent, DialogFooter } from "../ui/dialog";

const CourseForm = ({ handleSubmit, course, setCourse }) => {
  const {
    userState: { users },
    toastDispatch,
    courseDispatch,
  } = useAppContext();

  const [selectedValue, setSelectedValue] = useState([]);
  const userGroup = userGroups(users);

  // add course field
  const addCourses = () => {
    setCourse({
      ...course,
      course: [
        ...course.course,
        {
          id: uuid4(),
          name: "",
          price: null,
          users: [],
          purchase_date: Date,
          expire_date: Date,
        },
      ],
    });
  };

  // delete organization field
  const deleteCourse = (id) => {
    if (course.course.map((course) => course.id).includes(id)) {
      setCourse({
        ...course,
        course: course.course.filter((course) => course.id !== id),
      });
    }
  };

  const handleCourseUser = (value, id) => {
    setCourse((course) => ({
      ...course,
      course: course.course.map((data) => {
        if (data.id === id) {
          return {
            ...data,
            users: data.id === id ? value : data.users,
          };
        } else {
          return {
            ...data,
            user: data.users,
          };
        }
      }),
    }));
  };

  return (
    <DialogContent className="overflow-y-scroll max-h-[90%]">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center">
            <label htmlFor="platform" className="col-span-4">
              Platform<span className="text-red-500">*</span>
            </label>
            <Input
              required
              id="platform"
              placeholder="platform"
              value={course?.platform ? course?.platform : ""}
              className="col-span-4"
              onChange={(e) =>
                setCourse({ ...course, platform: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center">
            <label htmlFor="website" className="col-span-4">
              Website<span className="text-red-500">*</span>
            </label>
            <Input
              required
              id="website"
              placeholder="website"
              value={course?.website ? course?.website : ""}
              className="col-span-4"
              onChange={(e) =>
                setCourse({ ...course, website: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center">
            <label htmlFor="email" className="col-span-4">
              Email
            </label>
            <Input
              id="email"
              placeholder="email"
              value={course?.email ? course?.email : ""}
              className="col-span-4"
              onChange={(e) => setCourse({ ...course, email: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center">
            <label htmlFor="password" className="col-span-4">
              Password
            </label>
            <Input
              id="password"
              placeholder="password"
              value={course?.password ? course?.password : ""}
              className="col-span-4"
              onChange={(e) =>
                setCourse({ ...course, password: e.target.value })
              }
            />
          </div>
          {course?.course &&
            course?.course.map((singleCourse, i) => (
              <div key={i} className="expand_border grid gap-4 p-4">
                <X
                  onClick={() => deleteCourse(singleCourse.id)}
                  size={16}
                  className="text-red-500 absolute right-1 top-1 cursor-pointer"
                />
                <div className="grid grid-cols-4 items-center">
                  <label htmlFor="courseName" className="col-span-4">
                    Course Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    required
                    id="courseName"
                    placeholder="course name"
                    value={singleCourse.name ? singleCourse.name : ""}
                    className="col-span-4"
                    onChange={(e) =>
                      setCourse({
                        ...course,
                        course: course.course.map((el) => {
                          return {
                            ...el,
                            name:
                              singleCourse.id === el.id
                                ? e.target.value
                                : el.name,
                          };
                        }),
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <label htmlFor="price" className="col-span-4">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <Input
                    required
                    id="price"
                    type="number"
                    placeholder="price"
                    value={singleCourse.price ? singleCourse.price : ""}
                    className="col-span-4"
                    onChange={(e) =>
                      setCourse({
                        ...course,
                        course: course.course.map((el) => {
                          return {
                            ...el,
                            price:
                              singleCourse.id === el.id
                                ? e.target.value
                                : el.price,
                          };
                        }),
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <label htmlFor="purchase_date" className="col-span-4">
                    Purchase Date
                  </label>
                  <Input
                    id="purchase_date"
                    type="date"
                    placeholder="purchase date"
                    value={
                      singleCourse.purchase_date
                        ? dateInput(singleCourse.purchase_date)
                        : singleCourse.purchase_date
                    }
                    className="col-span-4"
                    onChange={(e) =>
                      setCourse({
                        ...course,
                        course: course.course.map((el) => {
                          return {
                            ...el,
                            purchase_date:
                              singleCourse.id === el.id
                                ? e.target.value
                                : el.purchase_date,
                          };
                        }),
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <label htmlFor="expire_date" className="col-span-4">
                    Expire Date
                  </label>
                  <Input
                    id="expire_date"
                    type="date"
                    placeholder="expire date"
                    value={
                      singleCourse.expire_date
                        ? dateInput(singleCourse.expire_date)
                        : singleCourse.expire_date
                    }
                    className="col-span-4"
                    onChange={(e) =>
                      setCourse({
                        ...course,
                        course: course.course.map((el) => {
                          return {
                            ...el,
                            expire_date:
                              singleCourse.id === el.id
                                ? e.target.value
                                : el.expire_date,
                          };
                        }),
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <label htmlFor="organization" className="col-span-4">
                    Users <span className="text-red-500">*</span>
                  </label>
                  <Select
                    required
                    value={
                      singleCourse.users ? singleCourse.user : selectedValue
                    }
                    defaultValue={singleCourse?.users.flat()}
                    isSearchable={false}
                    options={userGroup}
                    isMulti
                    closeMenuOnSelect={false}
                    onChange={(value) => (
                      setSelectedValue(value),
                      handleCourseUser(value, singleCourse.id)
                    )}
                    menuPlacement="auto"
                    className="col-span-4"
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary: "black",
                      },
                    })}
                  />
                </div>
              </div>
            ))}
        </div>
        <Button
          type="button"
          onClick={addCourses}
          className="w-full mb-5 expand_border grid gap-4 bg-background text-text-color"
        >
          Add Course
        </Button>

        <DialogFooter>
          <Button type="submit">Save Course</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default CourseForm;
