"use client";

import { useAppContext } from "@/app/provider";
import Axios from "@/lib/axios";
import { ChevronDown, Trash } from "lucide-react";
import { useState } from "react";
import UpdateCourse from "../courses/UpdateCourse";
import { Badge } from "../ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { Toggle } from "../ui/toggle";

const CourseCard = ({ course }) => {
  const [courseDeleteModal, setCourseDeleteModal] = useState(false);

  const {
    courseDispatch,
    toastDispatch,
    userState: { users },
    filterCoursesState: { courses: filterCourses, course: singleCourse },
    filterCoursesDisPatch,
  } = useAppContext();

  // delete corse
  const deleteCorse = async () => {
    const res = await Axios.delete(`course/${course._id}`);

    if (res.status === 200) {
      courseDispatch({
        type: "DELETE_COURSE",
        id: course._id,
      });
      toastDispatch({
        type: "TOAST",
        message: "Delete Successfuly",
      });
      setCourseDeleteModal(false);
    }
  };

  return (
    <>
      <TableBody>
        <Collapsible asChild>
          <>
            <TableRow>
              <TableCell>
                <CollapsibleTrigger asChild>
                  <Toggle aria-label="Toggle italic">
                    <ChevronDown />
                  </Toggle>
                </CollapsibleTrigger>
              </TableCell>
              <TableCell>{course?.platform}</TableCell>
              <TableCell>{course?.website}</TableCell>
              <TableCell>{course?.email}</TableCell>
              <TableCell>{course?.password}</TableCell>
              <TableCell>
                <UpdateCourse course={course} />
              </TableCell>
              <TableCell>
                <Trash
                  onClick={() => deleteCorse(course?._id)}
                  style={{ color: "red" }}
                />
              </TableCell>
            </TableRow>
            <CollapsibleContent asChild>
              <TableRow>
                <TableCell colSpan={8}>
                  {course.course.map((courseData, i) => (
                    <div key={i} className="expand_border mb-2">
                      <h5 className="mb-3">{courseData.name}</h5>

                      <h6 className="mb-2">Price: ${courseData.price}</h6>
                      <div className="flex items-center">
                        <h6 className="mr-2">Users:</h6>
                        {users
                          .filter((user) =>
                            courseData.users.includes(user.user_id)
                          )
                          .map((user, i) => (
                            <Badge key={i} variant="outline" className="mr-2">
                              {user.name}
                            </Badge>
                          ))}{" "}
                      </div>
                    </div>
                  ))}
                </TableCell>
              </TableRow>
            </CollapsibleContent>
          </>
        </Collapsible>
      </TableBody>
    </>
  );
};

export default CourseCard;
