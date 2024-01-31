"use client";

import { useAppContext } from "@/app/provider";
import Axios from "@/lib/axios";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import ToolForm from "../form/ToolForm";
import { Dialog, DialogTrigger } from "../ui/dialog";

const UpdateTool = ({ tool }) => {
  const {
    toastDispatch,
    toolDispatch,
    filterOrganizationDisPatch,
    filterDisPatch,
    filterUserState,
    toolState: { tools, loading, error },
    userState: { users },
  } = useAppContext();

  // call users
  const [updatedTool, setUpdatedTool] = useState({});
  useEffect(() => {
    users?.length > 0 &&
      setUpdatedTool({
        platform: tool?.platform,
        website: tool?.website,
        price: tool?.price,
        email: tool?.email,
        password: tool?.password,
        purchase_date: tool?.purchase_date,
        expire_date: tool?.expire_date,
        organization: tool?.organization?.map((a) => ({
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

  // reset tool
  const reset = () => {
    setUpdatedTool({
      ...updatedTool,
      platform: updatedTool.platform,
      website: updatedTool.website,
      price: updatedTool.price,
      email: updatedTool.email,
      password: updatedTool.password,
      expire_date: updatedTool.expire_date,
      organization: updatedTool.organization,
    });
  };

  const handleOpen = (id) => {
    if (id === tool._id) {
      filterOrganizationDisPatch({
        type: "SINGLE_TOOL",
        id: tool._id,
      });
    }
  };

  const [open, setOpen] = useState(false);

  // update tool
  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await Axios.patch(`tool/${tool._id}`, {
      tool: {
        ...updatedTool,
        organization: updatedTool.organization.map((d) => {
          return {
            ...d,
            unique_id: updatedTool.platform + d.name,
            users: d.users.map((a) => a.value),
          };
        }),
      },
    });

    if (res.status === 200) {
      reset();
      setOpen(false);
      toolDispatch({
        type: "UPDATE_TOOL",
        payload: updatedTool,
        id: tool._id,
      });
      toastDispatch({
        type: "TOAST",
        message: "Update Successfully",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pencil
          onClick={() => handleOpen(tool._id)}
          style={{ color: "green" }}
          className="cursor-pointer"
        />
      </DialogTrigger>
      <ToolForm
        handleSubmit={handleUpdate}
        tool={updatedTool}
        setTool={setUpdatedTool}
      />
    </Dialog>
  );
};

export default UpdateTool;
