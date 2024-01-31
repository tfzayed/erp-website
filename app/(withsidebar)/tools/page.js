"use client";

import { Table, TableHead, TableHeader, TableRow } from "@/component/ui/table";

import ToolCard from "@/component/cards/ToolCard";
import ToolForm from "@/component/form/ToolForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Axios from "@/lib/axios";
import { useAppContext } from "app/provider";
import { useState } from "react";

export default function Tools() {
  const {
    toolState: { tools, loading, error },
    toolDispatch,
    toastDispatch,
    userState: { users },
  } = useAppContext();

  const [tool, setTool] = useState({
    name: "",
    website: "",
    price: "",
    email: "",
    password: "",
    organization: [
      {
        name: "",
        users: [],
      },
    ],
  });

  const reset = () => {
    setTool({
      ...tool,
      name: "",
      website: "",
      price: "",
      email: "",
      password: "",
      organization: [
        {
          name: "",
          users: [],
        },
      ],
    });
  };

  const [open, setOpen] = useState(false);

  // add tool
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await Axios.post("tool", {
      tool: {
        ...tool,
        organization: tool.organization.map((d) => {
          return {
            ...d,
            users: d.users.map((a) => a.value),
          };
        }),
      },
    });
    if (res.status === 200) {
      reset();
      setOpen(false);
      toolDispatch({
        type: "ADD_TOOL",
        payload: tool,
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
            Add Tool
          </Button>
        </DialogTrigger>
        <ToolForm tool={tool} setTool={setTool} handleSubmit={handleSubmit} />
      </Dialog>

      <Table className="mb-10">
        <TableHeader>
          <TableRow>
            <TableHead>Expand</TableHead>
            <TableHead>Tool</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Purchase Date</TableHead>
            <TableHead>Expire Date</TableHead>
            <TableHead>Update</TableHead>
            <TableHead>Remove</TableHead>
          </TableRow>
        </TableHeader>
        {tools.map((tool, i) => (
          <ToolCard tool={tool} key={i} />
        ))}
      </Table>
    </>
  );
}
