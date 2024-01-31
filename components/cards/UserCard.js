"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/component/ui/collapsible";
import { Toggle } from "@/component/ui/toggle";
import Axios from "@/lib/axios";
import { useAppContext } from "app/provider";
import { ChevronDown, Trash } from "lucide-react";
import { useState } from "react";
import UserUpdate from "../form/UserUpdate";
import { Badge } from "../ui/badge";
import { TableBody, TableCell, TableRow } from "../ui/table";

const UserCard = ({ admin }) => {
  const {
    toolState: { tools },
    courseState: { courses },
    profileState: { profiles },
    assetState: { assets },
    userState: { users },
    userDispatch,
    filterUserState,
    filterDisPatch,
    toastDispatch,
  } = useAppContext();

  const [isDeleteModal, setIsDeleteModal] = useState(false);

  // delete user
  const deleteUser = async (id) => {
    const res = await Axios.delete(`user/${id}`);
    if (res.status === 200) {
      userDispatch({
        type: "DELETE_USER",
        id: id,
      });
      toastDispatch({
        type: "TOAST",
        message: "Delete User Successfully",
      });
      setIsDeleteModal(false);
    }
  };

  return (
    <>
      {users.map((user, i) => (
        <TableBody key={i}>
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
                <TableCell>{user?.name}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.phone}</TableCell>
                <TableCell>{user?.department}</TableCell>
                <TableCell>{user?.designation}</TableCell>
                <TableCell>
                  <UserUpdate user={user} admin={admin} />
                </TableCell>
                {admin && (
                  <TableCell>
                    <Trash
                      onClick={() => deleteUser(user?._id)}
                      style={{ color: "red" }}
                    />
                  </TableCell>
                )}
              </TableRow>
              <CollapsibleContent asChild>
                <TableRow>
                  <TableCell colSpan={8} className="">
                    {/* tools */}
                    <div className="expand_border mb-2">
                      <h5 className="mb-3">Tools</h5>
                      {tools
                        .filter((data) =>
                          data.organization.find((d) =>
                            d.users.includes(user?.user_id)
                          )
                        )
                        .map((a, i) => (
                          <div key={i} className="flex items-centers mb-2">
                            <h6 className="mr-2">{a?.platform}:</h6>
                            {a.organization.map((b, i) => (
                              <Badge key={i} variant="outline" className="mr-2">
                                {b.name}
                              </Badge>
                            ))}
                          </div>
                        ))}
                    </div>
                    {/* course */}
                    <div className="expand_border mb-2">
                      <h5 className="mb-3">Courses</h5>
                      {courses
                        .filter((data) =>
                          data.course.find((d) =>
                            d.users.includes(user?.user_id)
                          )
                        )
                        .map((a, i) => (
                          <div key={i} className="flex items-centers mb-2">
                            <h6 className="mr-2">{a?.platform}:</h6>
                            {a.course.map((b, i) => (
                              <Badge key={i} variant="outline" className="mr-2">
                                {b.name}
                              </Badge>
                            ))}
                          </div>
                        ))}
                    </div>
                    {/* profile */}
                    <div className="expand_border mb-2">
                      <h5 className="mb-3">Profiles</h5>
                      {profiles
                        .filter((data) =>
                          data.profiles.find((d) =>
                            d.users.includes(user?.user_id)
                          )
                        )
                        .map((a, i) => (
                          <div key={i} className="flex items-centers mb-2">
                            <h6 className="mr-2">{a?.platform}:</h6>
                            {a.profiles.map((b, i) => (
                              <Badge key={i} variant="outline" className="mr-2">
                                {b.name}
                              </Badge>
                            ))}
                          </div>
                        ))}
                    </div>
                    {/* asset */}
                    <div className="expand_border mb-2">
                      <h5 className="mb-3">Assets</h5>
                      <div className="flex items-centers mb-2">
                        <h6 className="mr-2">Devices:</h6>
                        {assets
                          .filter((asset) => asset.user[0] === user?.user_id)
                          .map((el, i) => (
                            <Badge key={i} variant="outline" className="mr-2">
                              {el.name}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </CollapsibleContent>
            </>
          </Collapsible>
        </TableBody>
      ))}
    </>
  );
};

export default UserCard;
