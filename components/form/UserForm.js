"use client";

import { useAppContext } from "@/app/provider";
import Axios from "@/lib/axios";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

const UserForm = () => {
  const { userDispatch, toastDispatch } = useAppContext();
  const [user, setUser] = useState({
    name: "",
    email: "",
    user_id: "",
  });

  const reset = () => {
    setUser({
      ...user,
      name: "",
      email: "",
    });
  };

  const [open, setOpen] = useState(false);

  // add user
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await Axios.post("user", user);
    if (res.status === 200) {
      userDispatch({
        type: "ADD_USER",
        payload: user,
      });
      toastDispatch({
        type: "TOAST",
        message: "Add Employee Successfully",
      });
      setOpen(false);
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-5">
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-scroll max-h-[90%]">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-3 py-4">
            <div className="grid grid-cols-4 items-center">
              <label htmlFor="name" className="col-span-4">
                Name<span className="text-red-500">*</span>
              </label>
              <Input
                required
                id="name"
                placeholder="name"
                value={user?.name ? user?.name : ""}
                className="col-span-4"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <label htmlFor="email" className="col-span-4">
                Email<span className="text-red-500">*</span>
              </label>
              <Input
                required
                id="email"
                placeholder="email"
                value={user?.email ? user?.email : ""}
                className="col-span-4"
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: e.target.value,
                    user_id: `@${e.target.value?.replace(/[.-@]/g, "_")}`,
                  })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Save User</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
