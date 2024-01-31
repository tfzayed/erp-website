"use client";

import { useAppContext } from "@/app/provider";
import ProfileCard from "@/component/cards/ProfileCard";
import ProfileForm from "@/component/form/ProfileForm";
import { Button } from "@/component/ui/button";
import { Dialog, DialogTrigger } from "@/component/ui/dialog";
import { Table, TableHead, TableHeader, TableRow } from "@/component/ui/table";
import Axios from "@/lib/axios";
import { useState } from "react";
import { v4 as uuid4 } from "uuid";

export default function Profiles() {
  const {
    profileState: { profiles, loading, error },
    profileDispatch,
    toastDispatch,
  } = useAppContext();

  const [profile, setProfile] = useState({
    platform: "",
    website: "",
    profiles: [
      {
        unique_id: uuid4(),
        name: "",
        users: [],
        price: "",
        password: "",
        expire_date: Date,
      },
    ],
  });

  const reset = () => {
    setProfile({
      ...profile,
      platform: "",
      website: "",
      profiles: [
        {
          unique_id: uuid4(),
          name: "",
          users: [],
          price: "",
          password: "",
          expire_date: Date,
        },
      ],
    });
  };

  const [open, setOpen] = useState(false);

  // add profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await Axios.post("profile", {
      profile: {
        ...profile,
        profiles: profile.profiles.map((d) => {
          return {
            ...d,
            users: d.users.map((a) => a.value),
          };
        }),
      },
    });
    if (res.status === 200) {
      setOpen(false);
      reset();
      profileDispatch({
        type: "ADD_PROFILE",
        payload: profile,
      });
      toastDispatch({
        type: "TOAST",
        message: "Add Successfully",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mb-5">
            Add Profiles
          </Button>
        </DialogTrigger>
        <ProfileForm
          profile={profile}
          setProfile={setProfile}
          handleSubmit={handleSubmit}
        />
      </Dialog>

      <Table className="mb-10">
        <TableHeader>
          <TableRow>
            <TableHead>Expand</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Update</TableHead>
            <TableHead>Remove</TableHead>
          </TableRow>
        </TableHeader>
        {profiles.map((profile, i) => (
          <ProfileCard profile={profile} key={i} />
        ))}
      </Table>
    </>
  );
}
