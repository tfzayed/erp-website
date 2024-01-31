"use client";

import { useAppContext } from "@/app/provider";
import { Input } from "@/components/ui/input";
import { dateInput } from "@/lib/dateInput";
import { X } from "lucide-react";
import { useState } from "react";
import Select from "react-select";
import { userGroups } from "../UserList";
import { Button } from "../ui/button";
import { DialogContent, DialogFooter } from "../ui/dialog";

const ToolForm = ({ tool, setTool, handleSubmit }) => {
  const {
    userState: { users },
    toolState: { tools },
  } = useAppContext();

  const userGroup = userGroups(users);
  const [selectedValue, setSelectedValue] = useState([]);

  // add organization field
  const addOrganization = () => {
    setTool({
      ...tool,
      organization: [
        ...tool?.organization,
        { name: "", users: [], unique_id: "" },
      ],
    });
  };

  // delete organization field
  const deleteOrganization = (id) => {
    if (tool?.organization.map((org) => org.unique_id).includes(id)) {
      setTool({
        ...tool,
        organization: tool?.organization.filter((org) => org.unique_id !== id),
      });
    }
  };

  // add multiple user
  const handleToolUser = (value, id) => {
    setTool((tool) => ({
      ...tool,
      organization: tool.organization.map((data) => {
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
              value={tool?.platform ? tool?.platform : ""}
              className="col-span-4"
              onChange={(e) => setTool({ ...tool, platform: e.target.value })}
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
              value={tool?.website ? tool?.website : ""}
              className="col-span-4"
              onChange={(e) => setTool({ ...tool, website: e.target.value })}
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
              value={tool?.email ? tool?.email : ""}
              className="col-span-4"
              onChange={(e) => setTool({ ...tool, email: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center">
            <label htmlFor="password" className="col-span-4">
              Password
            </label>
            <Input
              id="password"
              placeholder="password"
              value={tool?.password ? tool?.password : ""}
              className="col-span-4"
              onChange={(e) => setTool({ ...tool, password: e.target.value })}
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
              value={tool?.price ? tool?.price : ""}
              className="col-span-4"
              onChange={(e) => setTool({ ...tool, price: e.target.value })}
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
                tool.purchase_date
                  ? dateInput(tool.purchase_date)
                  : tool.purchase_date
              }
              className="col-span-4"
              onChange={(e) =>
                setTool({ ...tool, purchase_date: e.target.value })
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
                tool?.expire_date
                  ? dateInput(tool?.expire_date)
                  : tool?.expire_date
              }
              className="col-span-4"
              onChange={(e) =>
                setTool({ ...tool, expire_date: e.target.value })
              }
            />
          </div>
          {tool?.organization &&
            tool?.organization?.map((org, i) => (
              <div key={i} className="expand_border grid gap-4 p-4">
                <X
                  onClick={() => deleteOrganization(org.unique_id)}
                  size={16}
                  className="text-red-500 absolute right-1 top-1 cursor-pointer"
                />
                <div className="grid grid-cols-4 items-center">
                  <label htmlFor="organization" className="col-span-4">
                    Organization <span className="text-red-500">*</span>
                  </label>
                  <Input
                    required
                    id="organization"
                    placeholder="organization"
                    value={org.name ? org.name : ""}
                    className="col-span-4"
                    onChange={(e) =>
                      setTool({
                        ...tool,
                        organization: tool.organization.map((el) => {
                          return {
                            ...el,
                            unique_id: tool.platform + el.name,
                            name:
                              org.unique_id === el.unique_id
                                ? e.target.value
                                : el.name,
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
                    value={org.users ? org.user : selectedValue}
                    defaultValue={org?.users.flat()}
                    options={userGroup}
                    isSearchable={false}
                    isMulti
                    closeMenuOnSelect={false}
                    onChange={(value) => (
                      setSelectedValue(value),
                      handleToolUser(value, org.unique_id)
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
          onClick={addOrganization}
          className="w-full mb-5 expand_border grid gap-4 bg-background text-text-color"
        >
          Add Organization
        </Button>

        <DialogFooter>
          <Button type="submit">Save Tool</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default ToolForm;
