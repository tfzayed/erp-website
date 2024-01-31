"use client";

import CourseCard from "@/component/cards/CourseCard";
import CourseForm from "@/component/form/CourseForm";
import { Button } from "@/component/ui/button";
import { Dialog, DialogTrigger } from "@/component/ui/dialog";
import { Table, TableHead, TableHeader, TableRow } from "@/component/ui/table";
import Axios from "@/lib/axios";
import { useAppContext } from "app/provider";
import { useState } from "react";
import { v4 as uuid4 } from "uuid";

export default function Courses() {
  const {
    courseState: { loading, error, courses },
    courseDispatch,
    toastDispatch,
  } = useAppContext();

  const [course, setCourse] = useState({
    platform: "",
    website: "",
    email: "",
    password: "",
    course: [
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

  // reset course
  const reset = () => {
    setCourse({
      ...course,
      platform: "",
      website: "",
      email: "",
      password: "",
      course: [
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

  const [open, setOpen] = useState(false);

  // add course
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await Axios.post("course", {
      course: {
        ...course,
        course: course.course.map((el) => {
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
        type: "ADD_COURSE",
        payload: course,
      });
      toastDispatch({
        type: "TOAST",
        message: "Added Successfuly",
      });
    }
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mb-5">
            Add Course
          </Button>
        </DialogTrigger>
        <CourseForm
          course={course}
          setCourse={setCourse}
          handleSubmit={handleSubmit}
        />
      </Dialog>

      <Table className="mb-10">
        <TableHeader>
          <TableRow>
            <TableHead>Expand</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Update</TableHead>
            <TableHead>Remove</TableHead>
          </TableRow>
        </TableHeader>
        {courses.map((course, i) => (
          <CourseCard course={course} key={i} />
        ))}
      </Table>
    </>
  );
}
