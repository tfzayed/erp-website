"use client";

import { useAppContext } from "@/app/provider";
import Axios from "@/lib/axios";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import ProfileForm from "../form/ProfileForm";
import { Dialog, DialogTrigger } from "../ui/dialog";

const UpdateProfile = ({ profile }) => {
  const {
    toastDispatch,
    profileDispatch,
    userState: { users },
    filterProfileDisPatch,
  } = useAppContext();

  // call users
  const [updateProfile, setUpdateProfile] = useState({});
  useEffect(() => {
    users?.length > 0 &&
      setUpdateProfile({
        platform: profile?.platform,
        website: profile?.website,
        profiles: profile?.profiles?.map((a) => ({
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
  // add new  profiles field

  //   reset profile
  const reset = () => {
    setUpdateProfile({
      ...updateProfile,
      platform: updateProfile.platform,
      website: updateProfile.website,
      profiles: updateProfile.profiles,
    });
  };

  const handleOpen = (id) => {
    if (id === profile._id) {
      filterProfileDisPatch({
        type: "SINGLE_PROFILE",
        id: profile._id,
      });
    }
  };

  const [open, setOpen] = useState(false);

  //   update profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await Axios.patch(`profile/${profile?._id}`, {
      profile: {
        ...updateProfile,
        profiles: updateProfile.profiles.map((d) => {
          return {
            ...d,
            unique_id: updateProfile.platform + d.name,
            users: d.users.map((a) => a.value),
          };
        }),
      },
    });
    if (res.status === 200) {
      setOpen(false);
      reset();
      profileDispatch({
        type: "UPDATE_PROFILE",
        payload: updateProfile,
        id: profile._id,
      });
      toastDispatch({
        type: "TOAST",
        message: "Update Successfully",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Pencil
            onClick={() => handleOpen(profile._id)}
            style={{ color: "green" }}
            className="cursor-pointer"
          />
        </DialogTrigger>
        <ProfileForm
          handleSubmit={handleUpdate}
          profile={updateProfile}
          users={users}
          setProfile={setUpdateProfile}
        />
      </Dialog>
    </>
  );
};

export default UpdateProfile;
