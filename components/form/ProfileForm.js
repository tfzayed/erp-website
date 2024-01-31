"use client";

import { useAppContext } from "@/app/provider";
import { dateInput } from "@/lib/dateInput";
import { X } from "lucide-react";
import { useState } from "react";
import Select from "react-select";
import { userGroups } from "../UserList";
import { Button } from "../ui/button";
import { DialogContent, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";

const ProfileForm = ({ profile, setProfile, handleSubmit }) => {
  const {
    userState: { users },
  } = useAppContext();

  const [selectedValue, setSelectedValue] = useState([]);
  const userGroup = userGroups(users);

  // add profiles field
  const addProfile = () => {
    setProfile({
      ...profile,
      profiles: [
        ...profile.profiles,
        {
          name: "",
          price: null,
          password: "",
          users: [],
          unique_id: "",
          expire_date: Date,
        },
      ],
    });
  };

  // delete profiles field
  const deleteProfile = (id) => {
    if (profile.profiles.map((el) => el.unique_id).includes(id)) {
      setProfile({
        ...profile,
        profiles: profile.profiles.filter((el) => el.unique_id !== id),
      });
    }
  };

  // add multiple user
  const handleProfileUser = (value, id) => {
    setProfile((profile) => ({
      ...profile,
      profiles: profile.profiles.map((data) => {
        if (data.unique_id === id) {
          return {
            ...data,
            users: data.unique_id === id ? value : data.users,
          };
        } else {
          return {
            ...data,
            users: data.users,
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
              value={profile?.platform ? profile?.platform : ""}
              className="col-span-4"
              onChange={(e) =>
                setProfile({ ...profile, platform: e.target.value })
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
              value={profile?.website ? profile?.website : ""}
              className="col-span-4"
              onChange={(e) =>
                setProfile({ ...profile, website: e.target.value })
              }
            />
          </div>
          {profile?.profiles &&
            profile?.profiles.map((singleProfile, i) => (
              <div key={i} className="expand_border grid gap-4 p-4">
                <X
                  size={16}
                  className="text-red-500 absolute right-1 top-1 cursor-pointer"
                />
                <div className="grid grid-cols-4 items-center">
                  <label htmlFor="profileName" className="col-span-4">
                    Profile Name <span className="text-red-500">*</span>
                  </label>

                  <Input
                    required
                    id="profileName"
                    placeholder="profile name"
                    value={singleProfile.name ? singleProfile.name : ""}
                    className="col-span-4"
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        profiles: profile.profiles.map((el) => {
                          return {
                            ...el,
                            name:
                              singleProfile.unique_id === el.unique_id
                                ? e.target.value
                                : el.name,
                          };
                        }),
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <label htmlFor="password" className="col-span-4">
                    Password
                  </label>

                  <Input
                    id="password"
                    placeholder="password"
                    value={singleProfile.password ? singleProfile.password : ""}
                    className="col-span-4"
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        profiles: profile.profiles.map((el) => {
                          return {
                            ...el,
                            password:
                              singleProfile.unique_id === el.unique_id
                                ? e.target.value
                                : el.password,
                          };
                        }),
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center">
                  <label htmlFor="price" className="col-span-4">
                    Price
                  </label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="price"
                    value={singleProfile.price ? singleProfile.price : ""}
                    className="col-span-4"
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        profiles: profile.profiles.map((el) => {
                          return {
                            ...el,
                            price:
                              singleProfile.unique_id === el.unique_id
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
                      singleProfile.purchase_date
                        ? dateInput(singleProfile.purchase_date)
                        : singleProfile.purchase_date
                    }
                    className="col-span-4"
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        profiles: profile.profiles.map((el) => {
                          return {
                            ...el,
                            purchase_date:
                              singleProfile.unique_id === el.unique_id
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
                      singleProfile?.expire_date
                        ? dateInput(singleProfile?.expire_date)
                        : singleProfile?.expire_date
                    }
                    className="col-span-4"
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        profiles: profile.profiles.map((el) => {
                          return {
                            ...el,
                            expire_date:
                              singleProfile.unique_id === el.unique_id
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
                      singleProfile.users ? singleProfile.user : selectedValue
                    }
                    defaultValue={singleProfile?.users.flat()}
                    options={userGroup}
                    isSearchable={false}
                    isMulti
                    closeMenuOnSelect={false}
                    onChange={(value) => (
                      setSelectedValue(value),
                      handleProfileUser(value, singleProfile.unique_id)
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
          onClick={addProfile}
          className="w-full mb-5 expand_border grid gap-4 bg-background text-text-color"
        >
          Add Profile
        </Button>

        <DialogFooter>
          <Button type="submit">Save Profile</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default ProfileForm;
