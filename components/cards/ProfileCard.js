"use client";

import { useAppContext } from "@/app/provider";
import Axios from "@/lib/axios";
import dateFormat from "@/lib/dateFormat";
import { ChevronDown, Trash } from "lucide-react";
import { useState } from "react";
import UpdateProfile from "../profile/UpdateProfile";
import { Badge } from "../ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { Toggle } from "../ui/toggle";

const ProfileCard = ({ profile }) => {
  const [profileDeleteModal, setProfileDeleteModal] = useState(false);

  const {
    userState: { users },
    toastDispatch,
    filterProfileDisPatch,
    filterProfileState: { profiles: filterProfile },
    profileDispatch,
  } = useAppContext();

  // delete profile
  const deleteProfile = async () => {
    const res = await Axios.delete(`profile/${profile._id}`);

    if (res.status === 200) {
      profileDispatch({
        type: "DELETE_PROFILE",
        id: profile._id,
      });
      toastDispatch({
        type: "TOAST",
        message: "Delete Profile",
      });
      setProfileDeleteModal(false);
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
              <TableCell>{profile?.platform}</TableCell>
              <TableCell>{profile?.website}</TableCell>
              <TableCell>
                <UpdateProfile profile={profile} />
              </TableCell>
              <TableCell>
                <Trash
                  onClick={() => deleteProfile(profile?._id)}
                  style={{ color: "red" }}
                />
              </TableCell>
            </TableRow>
            <CollapsibleContent asChild>
              <TableRow>
                <TableCell colSpan={8}>
                  {/* tools */}
                  {profile.profiles.map((el, i) => (
                    <div key={`el-${i}`} className="expand_border mb-2">
                      <h5 className="mb-3">{el.name}</h5>
                      {el.price && <h6 className="mb-2">Price: ${el.price}</h6>}
                      {el.password && (
                        <h6 className="mb-2">Password: {el.password}</h6>
                      )}
                      {el.purchase_date && (
                        <h6 className="mb-2">
                          Purchase Date: {dateFormat(el.purchase_date)}
                        </h6>
                      )}
                      {el.expire_date && (
                        <h6 className="mb-2">
                          Expire Date: {dateFormat(el.expire_date)}
                        </h6>
                      )}
                      <div className="flex items-center">
                        <h6 className="mr-2">Users:</h6>
                        {users
                          .filter((user) => el.users.includes(user.user_id))
                          .map((user, i) => (
                            <Badge key={i} variant="outline" className="mr-2">
                              {user.name}
                            </Badge>
                          ))}
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

export default ProfileCard;
