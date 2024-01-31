"use client";

import { useAppContext } from "@/app/provider";
import Axios from "@/lib/axios";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import CourseForm from "../form/CourseForm";
import { Dialog, DialogTrigger } from "../ui/dialog";

const UpdateCourse = ({ course }) => {
  const {
    courseDispatch,
    toastDispatch,
    filterCoursesDisPatch,
    userState: { users },
  } = useAppContext();

  const [updatedCourse, setUpdatedCourse] = useState({});
  useEffect(() => {
    users?.length > 0 &&
      setUpdatedCourse({
        platform: course.platform,
        website: course.website,
        email: course.email,
        password: course.password,
        course: course.course?.map((a) => ({
          ...a,
          users: a?.users
            ?.map((b) =>
              users
                .filter((user) =>
                  typeof b === "string"
                    ? b?.includes(user?.user_id)
                    : b.value?.includes(user?.user_id)
                )
                .map((a) => ({ value: a?.user_id, label: a?.name }))
            )
            .flat(),
        })),
      });
  }, [users]);

  //   reset course
  const reset = () => {
    setUpdatedCourse({
      ...updatedCourse,
      platform: updatedCourse.platform,
      website: updatedCourse.website,
      email: updatedCourse.email,
      password: updatedCourse.password,
      course: updatedCourse.course,
    });
  };

  const handleOpen = (id) => {
    if (id === course._id) {
      filterCoursesDisPatch({
        type: "SINGLE_COURSES",
        id: course._id,
      });
    }
  };

  const [open, setOpen] = useState(false);

  // update course
  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await Axios.patch(`course/${course._id}`, {
      course: {
        ...updatedCourse,
        course: updatedCourse.course.map((el) => {
          return {
            ...el,
            users: el.users.map((a) => a.value),
          };
        }),
      },
    });
    if (res.status === 200) {
      setOpen(false);
      reset();
      courseDispatch({
        type: "UPDATE_COURSE",
        payload: updatedCourse,
        id: course._id,
      });
      toastDispatch({
        type: "TOAST",
        message: "Update Successfuly",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Pencil
            onClick={() => handleOpen(course._id)}
            style={{ color: "green" }}
            className="cursor-pointer"
          />
        </DialogTrigger>
        <CourseForm
          handleSubmit={handleUpdate}
          course={updatedCourse}
          setCourse={setUpdatedCourse}
          users={users}
        />
      </Dialog>
    </>
  );
};

export default UpdateCourse;
