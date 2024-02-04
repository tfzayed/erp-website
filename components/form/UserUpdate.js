"use client";

import { useAppContext } from "@/app/provider";
import Axios from "@/lib/axios";
import { dateInput } from "@/lib/dateInput";
import { Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";
import Select from "react-select";
import { v4 as uuid4 } from "uuid";
import { userGroups } from "../UserList";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const UserUpdate = ({ user, admin }) => {
  const {
    toastDispatch,
    userDispatch,
    userState: { users },
  } = useAppContext();
  const [updateUser, setUpdateUser] = useState({});

  // react select options
  const userGroup = userGroups(users);

  const genderList = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const maritalList = [
    { value: "married", label: "Married" },
    { value: "unmarried", label: "Unmarried" },
    { value: "divorced", label: "Divorced" },
  ];

  const roleList = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];

  const departmentList = [
    { value: "admin", label: "Admin" },
    { value: "development", label: "Development" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
  ];

  const employmentTypeList = [
    { value: "fulltime", label: "Fulltime" },
    { value: "remote", label: "Remote" },
  ];

  const archiveList = [
    { value: true, label: "Yes" },
    { value: false, label: "No" },
  ];

  useEffect(() => {
    setUpdateUser({
      name: user.name,
      email: user.email,
      dob: user.dob,
      phone: user.phone,
      gender: user.gender
        ? [
            {
              value: user.gender,
              label: user?.gender[0]?.toUpperCase() + user?.gender?.slice(1),
            },
          ]
        : "",
      blood_group: user.blood_group,
      marital_status: user.marital_status
        ? [
            {
              value: user.marital_status,
              label:
                user?.marital_status[0]?.toUpperCase() +
                user?.marital_status?.slice(1),
            },
          ]
        : "",

      nid: user.nid,
      tin: user.tin,

      present_address: user.present_address,
      permanent_address: user.permanent_address,

      department: user.department
        ? [
            {
              value: user.department,
              label:
                user?.department[0]?.toUpperCase() + user?.department?.slice(1),
            },
          ]
        : "",
      designation: user.designation,
      join_date: user.join_date,
      permanent_join: user.permanent_join,
      resignation_date: user.resignation_date,
      employment_type: user.employment_type
        ? [
            {
              value: user.employment_type,
              label:
                user?.employment_type[0]?.toUpperCase() +
                user?.employment_type?.slice(1),
            },
          ]
        : "",
      manager: users
        .filter((u) => u.user_id === user?.manager)
        .map((a) => ({ value: a?.user_id, label: a?.name }))
        .flat()[0],
      role: user.role
        ? [
            {
              value: user.role,
              label: user?.role[0]?.toUpperCase() + user?.role?.slice(1),
            },
          ]
        : "",
      achievements: user.achievements,
      archived: user.archived,

      date: user.date,
      banks: user.banks,

      contacts: user.contacts,
      note: user.note,
    });
  }, [user.length]);

  const reset = () => {
    setUpdateUser({
      ...updateUser,
      name: updateUser.name,
      email: updateUser.email,
      dob: updateUser.dob,
      phone: updateUser.phone,
      gender: updateUser.gender,
      blood_group: updateUser.blood_group,
      marital_status: updateUser.marital_status,

      nid: updateUser.nid,
      tin: updateUser.tin,

      present_address: updateUser.present_address,
      permanent_address: updateUser.permanent_address,

      department: updateUser.department,
      designation: updateUser.designation,
      join_date: updateUser.join_date,
      permanent_join: updateUser.permanent_join,
      resignation_date: updateUser.resignation_date,
      employment_type: updateUser.employment_type,
      manager: updateUser.manager,
      role: updateUser.role,
      achievements: updateUser.achievements,
      archived: updateUser.archived,

      date: updateUser.date,
      banks: updateUser.banks,

      contacts: updateUser.contacts,
      note: updateUser.note,
    });
  };

  // achievement
  const addAchievement = () => {
    setUpdateUser({
      ...updateUser,
      achievements: [
        ...updateUser.achievements,
        { name: "", date: Date, id: uuid4() },
      ],
    });
  };
  const deleteAchievement = (id) => {
    if (updateUser?.achievements.map((ac) => ac.name).includes(id)) {
      setUpdateUser({
        ...updateUser,
        achievements: updateUser.achievements.filter((ac) => ac.name !== id),
      });
    }
  };

  // bank
  const addBank = () => {
    setUpdateUser({
      ...updateUser,
      banks: [
        ...updateUser.banks,
        {
          bank_name: "",
          branch_name: "",
          acc_name: "",
          acc_number: "",
          routing_number: "",
          id: uuid4(),
        },
      ],
    });
  };
  const deleteBank = (id) => {
    if (updateUser?.banks.map((ac) => ac.bank_name).includes(id)) {
      setUpdateUser({
        ...updateUser,
        banks: updateUser.banks.filter((ac) => ac.bank_name !== id),
      });
    }
  };

  // contact
  const addContact = () => {
    setUpdateUser({
      ...updateUser,
      contacts: [
        ...updateUser.contacts,
        {
          id: uuid4(),
          name: "",
          relation: "",
          phone: "",
        },
      ],
    });
  };
  const deleteContact = (id) => {
    if (updateUser?.contacts.map((ac) => ac.name).includes(id)) {
      setUpdateUser({
        ...updateUser,
        contacts: updateUser.contacts.filter((ac) => ac.name !== id),
      });
    }
  };

  const [open, setOpen] = useState(false);

  // update updateUser
  const handleUpdate = async (e) => {
    e.preventDefault();

    const modifiedUserData = {
      ...updateUser,
      gender: updateUser?.gender
        ? typeof updateUser?.gender === "string"
          ? updateUser?.gender
          : updateUser?.gender?.map((a) => a.value)[0]
        : updateUser?.gender,
      marital_status: updateUser?.marital_status
        ? typeof updateUser?.marital_status === "string"
          ? updateUser?.marital_status
          : updateUser?.marital_status.map((a) => a.value)[0]
        : updateUser?.marital_status,
      role: updateUser?.role
        ? typeof updateUser?.role === "string"
          ? updateUser?.role
          : updateUser?.role.map((a) => a.value)[0]
        : updateUser?.role,
      department: updateUser?.department
        ? typeof updateUser?.department === "string"
          ? updateUser?.department
          : updateUser?.department.map((a) => a.value)[0]
        : updateUser?.department,
      employment_type: updateUser?.employment_type
        ? typeof updateUser?.employment_type === "string"
          ? updateUser?.employment_type
          : updateUser?.employment_type.map((a) => a?.value)[0]
        : updateUser?.employment_type,
      manager: updateUser?.manager
        ? typeof updateUser?.manager === "string"
          ? updateUser?.manager
          : updateUser?.manager?.value
        : updateUser?.manager,
    };

    const res = await Axios.patch(`user/${user._id}`, modifiedUserData);
    if (res.status === 200) {
      reset();
      setOpen(false);
      userDispatch({
        type: "UPDATE_USER",
        payload: modifiedUserData,
        id: user._id,
      });
      toastDispatch({
        type: "TOAST",
        message: "Update Employee Successfully",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pencil style={{ color: "green" }} className="cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="overflow-y-scroll max-h-[90%]">
        <form onSubmit={handleUpdate}>
          <div className="grid gap-4 py-4">
            {/* personal */}
            <div className="grid grid-cols-4 items-center">
              <label htmlFor="name" className="col-span-4">
                Name
              </label>
              <Input
                id="name"
                placeholder="name"
                value={updateUser?.name ? updateUser?.name : ""}
                className="col-span-4"
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, name: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <label htmlFor="email" className="col-span-4">
                Email
              </label>
              <Input
                readOnly={!admin && true}
                id="email"
                type="email"
                placeholder="email"
                value={updateUser?.email ? updateUser?.email : ""}
                className="col-span-4"
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, email: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <label htmlFor="dob" className="col-span-4">
                Date of Birth
              </label>
              <Input
                id="dob"
                type="date"
                placeholder="date of birth"
                value={updateUser?.dob ? dateInput(updateUser?.dob) : ""}
                className="col-span-4"
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, dob: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <label htmlFor="phone" className="col-span-4">
                Phone
              </label>
              <Input
                id="phone"
                placeholder="phone"
                value={updateUser?.phone ? updateUser?.phone : ""}
                className="col-span-4"
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, phone: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <label htmlFor="gender" className="col-span-4">
                Gender
              </label>
              <Select
                options={genderList}
                defaultValue={updateUser?.gender ? updateUser?.gender : ""}
                isSearchable={false}
                onChange={(value) =>
                  setUpdateUser({
                    ...updateUser,
                    gender: value.value,
                  })
                }
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
            <div className="grid grid-cols-4 items-center">
              <label htmlFor="blood" className="col-span-4">
                Blood Group
              </label>
              <Input
                id="blood"
                placeholder="blood"
                value={updateUser?.blood_group ? updateUser?.blood_group : ""}
                className="col-span-4"
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, blood_group: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <label htmlFor="marital_status" className="col-span-4">
                Marital Status
              </label>
              <Select
                defaultValue={
                  updateUser?.marital_status ? updateUser?.marital_status : ""
                }
                isSearchable={false}
                options={maritalList}
                onChange={(value) =>
                  setUpdateUser({
                    ...updateUser,
                    marital_status: value.value,
                  })
                }
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

            {/* id */}
            <div className="grid grid-cols-4 items-center">
              <label htmlFor="nid" className="col-span-4">
                NID
              </label>
              <Input
                id="nid"
                type="number"
                placeholder="nid"
                value={updateUser?.nid ? updateUser?.nid : ""}
                className="col-span-4"
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, nid: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <label htmlFor="tin" className="col-span-4">
                TIN
              </label>
              <Input
                id="tin"
                type="number"
                placeholder="tin"
                value={updateUser?.tin ? updateUser?.tin : ""}
                className="col-span-4"
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, tin: e.target.value })
                }
              />
            </div>

            {/* address */}
            <div className="grid grid-cols-4 items-center">
              <label htmlFor="present_address" className="col-span-4">
                Present Address
              </label>
              <Input
                id="present_address"
                placeholder="present address"
                value={
                  updateUser?.present_address ? updateUser?.present_address : ""
                }
                className="col-span-4"
                onChange={(e) =>
                  setUpdateUser({
                    ...updateUser,
                    present_address: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <label htmlFor="permanent_address" className="col-span-4">
                Permanent Address
              </label>
              <Input
                id="permanent_address"
                placeholder="permanent address"
                value={
                  updateUser?.permanent_address
                    ? updateUser?.permanent_address
                    : ""
                }
                className="col-span-4"
                onChange={(e) =>
                  setUpdateUser({
                    ...updateUser,
                    permanent_address: e.target.value,
                  })
                }
              />
            </div>

            {/* work */}
            <div className="grid grid-cols-4 items-center">
              <label htmlFor="role" className="col-span-4">
                Role <span className="text-red-500">*</span>
              </label>
              <Select
                required
                defaultValue={updateUser?.role ? updateUser?.role : ""}
                options={roleList}
                isSearchable={false}
                onChange={(value) =>
                  setUpdateUser({
                    ...updateUser,
                    role: value.value,
                  })
                }
                isOptionDisabled={() => !admin}
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
            <div className="grid grid-cols-4 items-center">
              <label htmlFor="department" className="col-span-4">
                Department
              </label>
              <Select
                defaultValue={
                  updateUser?.department ? updateUser?.department : ""
                }
                isSearchable={false}
                options={departmentList}
                onChange={(value) =>
                  setUpdateUser({
                    ...updateUser,
                    department: value.value,
                  })
                }
                isOptionDisabled={() => !admin}
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
            <div className="grid grid-cols-4 items-center">
              <label htmlFor="designation" className="col-span-4">
                Designation
              </label>
              <Input
                readOnly={!admin && true}
                id="designation"
                placeholder="designation"
                value={updateUser?.designation ? updateUser?.designation : ""}
                className="col-span-4"
                onChange={(e) =>
                  setUpdateUser({
                    ...updateUser,
                    designation: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <label htmlFor="employment_type" className="col-span-4">
                Employment Type
              </label>
              <Select
                defaultValue={
                  updateUser?.employment_type ? updateUser?.employment_type : ""
                }
                isSearchable={false}
                options={employmentTypeList}
                onChange={(value) =>
                  setUpdateUser({
                    ...updateUser,
                    employment_type: value.value,
                  })
                }
                isOptionDisabled={() => !admin}
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
            <div className="grid grid-cols-4 items-center">
              <label htmlFor="join_date" className="col-span-4">
                Join Date
              </label>
              <Input
                readOnly={!admin && true}
                id="join_date"
                type="date"
                placeholder="join date"
                value={
                  updateUser?.join_date ? dateInput(updateUser?.join_date) : ""
                }
                className="col-span-4"
                onChange={(e) =>
                  setUpdateUser({
                    ...updateUser,
                    join_date: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <label htmlFor="permanent_join" className="col-span-4">
                Permanent Date
              </label>
              <Input
                readOnly={!admin && true}
                id="permanent_join"
                type="date"
                placeholder="permanent date"
                value={
                  updateUser?.permanent_join
                    ? dateInput(updateUser?.permanent_join)
                    : ""
                }
                className="col-span-4"
                onChange={(e) =>
                  setUpdateUser({
                    ...updateUser,
                    permanent_join: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <label htmlFor="resignation_date" className="col-span-4">
                Resigned Date
              </label>

              <Input
                readOnly={!admin && true}
                id="resignation_date"
                type="date"
                placeholder="resign date"
                value={
                  updateUser?.resignation_date
                    ? dateInput(updateUser?.resignation_date)
                    : ""
                }
                className="col-span-4"
                onChange={(e) =>
                  setUpdateUser({
                    ...updateUser,
                    resignation_date: e.target.value,
                  })
                }
              />
            </div>
            {admin && (
              <div className="grid grid-cols-4 items-center">
                <label htmlFor="Manager" className="col-span-4">
                  Manager <span className="text-red-500">*</span>
                </label>
                <Select
                  required
                  defaultValue={updateUser?.manager ? updateUser?.manager : ""}
                  options={userGroup}
                  isSearchable={false}
                  onChange={(value) =>
                    setUpdateUser({
                      ...updateUser,
                      manager: value.value,
                    })
                  }
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
            )}
            {admin && (
              <div className="grid grid-cols-4 items-center">
                <label htmlFor="archived" className="col-span-4">
                  Archived
                </label>
                <Select
                  value={
                    updateUser?.archived === true
                      ? archiveList[0]
                      : archiveList[1]
                  }
                  isSearchable={false}
                  options={archiveList}
                  onChange={(value) =>
                    setUpdateUser({
                      ...updateUser,
                      archived: value.value,
                    })
                  }
                  isOptionDisabled={() => !admin}
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
            )}

            {/* achievements */}
            <div className="bg-light p-1 rounded-md">
              {updateUser?.achievements?.map((a, i) => (
                <div key={i} className="expand_border grid gap-2 mb-3 p-4">
                  {admin && (
                    <X
                      onClick={() => deleteAchievement(a.name)}
                      size={16}
                      className="text-red-500 absolute right-1 top-1 cursor-pointer"
                    />
                  )}
                  <div className="grid grid-cols-4 items-center">
                    <label htmlFor="achievement_name" className="col-span-4">
                      Achievement <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      readOnly={!admin && true}
                      id="achievement_name"
                      placeholder="achievement name"
                      value={a.name ? a.name : ""}
                      className="col-span-4"
                      onChange={(e) =>
                        setUpdateUser({
                          ...updateUser,
                          achievements: updateUser.achievements.map((el) => {
                            return {
                              ...el,
                              name: a.id === el.id ? e.target.value : el.name,
                            };
                          }),
                        })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center">
                    <label htmlFor="date" className="col-span-4">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      readOnly={!admin && true}
                      id="date"
                      type="date"
                      placeholder="date"
                      value={a.date ? dateInput(a.date) : a.date}
                      className="col-span-4"
                      onChange={(e) =>
                        setUpdateUser({
                          ...updateUser,
                          achievements: updateUser.achievements.map((el) => {
                            return {
                              ...el,
                              date: a.id === el.id ? e.target.value : el.date,
                            };
                          }),
                        })
                      }
                    />
                  </div>
                </div>
              ))}

              {admin && (
                <Button
                  type="button"
                  onClick={addAchievement}
                  className="w-full expand_border grid gap-4 bg-background text-text-color"
                >
                  Add Achievement
                </Button>
              )}
            </div>

            {/* bank */}
            <div className="bg-light p-1 rounded-md">
              {updateUser?.banks?.map((a, i) => (
                <div key={i} className="expand_border grid gap-2 mb-3 p-4">
                  <X
                    onClick={() => deleteBank(a.bank_name)}
                    size={16}
                    className="text-red-500 absolute right-1 top-1 cursor-pointer"
                  />
                  <div className="grid grid-cols-4 items-center">
                    <label htmlFor="bank_name" className="col-span-4">
                      Bank Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      id="bank_name"
                      placeholder="bank name"
                      value={a.bank_name ? a.bank_name : ""}
                      className="col-span-4"
                      onChange={(e) =>
                        setUpdateUser({
                          ...updateUser,
                          banks: updateUser.banks.map((el) => {
                            return {
                              ...el,
                              bank_name:
                                a.id === el.id ? e.target.value : el.bank_name,
                            };
                          }),
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center">
                    <label htmlFor="branch_name" className="col-span-4">
                      Branch name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      id="branch_name"
                      placeholder="branch name"
                      value={a.branch_name ? a.branch_name : ""}
                      className="col-span-4"
                      onChange={(e) =>
                        setUpdateUser({
                          ...updateUser,
                          banks: updateUser.banks.map((el) => {
                            return {
                              ...el,
                              branch_name:
                                a.id === el.id
                                  ? e.target.value
                                  : el.branch_name,
                            };
                          }),
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center">
                    <label htmlFor="acc_name" className="col-span-4">
                      Account Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      id="acc_name"
                      placeholder="account name"
                      value={a.acc_name ? a.acc_name : ""}
                      className="col-span-4"
                      onChange={(e) =>
                        setUpdateUser({
                          ...updateUser,
                          banks: updateUser.banks.map((el) => {
                            return {
                              ...el,
                              acc_name:
                                a.id === el.id ? e.target.value : el.acc_name,
                            };
                          }),
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center">
                    <label htmlFor="acc_number" className="col-span-4">
                      Account Number <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      id="acc_number"
                      type="number"
                      placeholder="account number"
                      value={a.acc_number ? a.acc_number : ""}
                      className="col-span-4"
                      onChange={(e) =>
                        setUpdateUser({
                          ...updateUser,
                          banks: updateUser.banks.map((el) => {
                            return {
                              ...el,
                              acc_number:
                                a.id === el.id ? e.target.value : el.acc_number,
                            };
                          }),
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center">
                    <label htmlFor="routing_number" className="col-span-4">
                      Routing Number <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      id="routing_number"
                      type="number"
                      placeholder="routing number"
                      value={a.routing_number ? a.routing_number : ""}
                      className="col-span-4"
                      onChange={(e) =>
                        setUpdateUser({
                          ...updateUser,
                          banks: updateUser.banks.map((el) => {
                            return {
                              ...el,
                              routing_number:
                                a.id === el.id
                                  ? e.target.value
                                  : el.routing_number,
                            };
                          }),
                        })
                      }
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                onClick={addBank}
                className="w-full expand_border grid gap-4 bg-background text-text-color"
              >
                Add Bank
              </Button>
            </div>

            {/* contacts */}
            <div className="bg-light p-1 rounded-md">
              {updateUser?.contacts?.map((a, i) => (
                <div key={i} className="expand_border grid gap-2 mb-3 p-4">
                  <X
                    onClick={() => deleteContact(a.name)}
                    size={16}
                    className="text-red-500 absolute right-1 top-1 cursor-pointer"
                  />
                  <div className="grid grid-cols-4 items-center">
                    <label htmlFor="name" className="col-span-4">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      id="name"
                      placeholder="name"
                      value={a.name ? a.name : ""}
                      className="col-span-4"
                      onChange={(e) =>
                        setUpdateUser({
                          ...updateUser,
                          contacts: updateUser.contacts.map((el) => {
                            return {
                              ...el,
                              name: a.id === el.id ? e.target.value : el.name,
                            };
                          }),
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center">
                    <label htmlFor="relation" className="col-span-4">
                      Relation <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      id="relation"
                      placeholder="relation"
                      value={a.relation ? a.relation : ""}
                      className="col-span-4"
                      onChange={(e) =>
                        setUpdateUser({
                          ...updateUser,
                          contacts: updateUser.contacts.map((el) => {
                            return {
                              ...el,
                              relation:
                                a.id === el.id ? e.target.value : el.relation,
                            };
                          }),
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center">
                    <label htmlFor="phone" className="col-span-4">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <Input
                      required
                      id="phone"
                      placeholder="phone"
                      value={a.phone ? a.phone : ""}
                      className="col-span-4"
                      onChange={(e) =>
                        setUpdateUser({
                          ...updateUser,
                          contacts: updateUser.contacts.map((el) => {
                            return {
                              ...el,
                              phone: a.id === el.id ? e.target.value : el.phone,
                            };
                          }),
                        })
                      }
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                onClick={addContact}
                className="w-full expand_border grid gap-4 bg-background text-text-color"
              >
                Add Contact
              </Button>
            </div>

            {admin && (
              <div className="grid grid-cols-4 items-center">
                <label htmlFor="note" className="col-span-4">
                  Note
                </label>
                <Textarea
                  id="note"
                  placeholder="note"
                  value={updateUser?.note ? updateUser?.note : ""}
                  className="col-span-4"
                  onChange={(e) =>
                    setUpdateUser({ ...updateUser, note: e.target.value })
                  }
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">Update User</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserUpdate;
