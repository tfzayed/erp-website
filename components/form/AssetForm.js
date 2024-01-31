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

const AssetForm = ({ handleSubmit, setAsset, asset }) => {
  const {
    userState: { users },
    toastDispatch,
    courseDispatch,
  } = useAppContext();

  const [selectedValue, setSelectedValue] = useState({});

  const userGroup = userGroups(users);

  const addLog = () => {
    setAsset({
      ...asset,
      logs: [...asset.logs, { id: asset.logs.length + 1, log: "" }],
    });
  };

  //   delete courses field
  const deleteLog = (id) => {
    if (asset.logs.map((log) => log.id).includes(id)) {
      setAsset({
        ...asset,
        logs: asset.logs.filter((log) => log.id !== id),
      });
    }
  };

  return (
    <DialogContent className="overflow-y-scroll max-h-[90%]">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center">
            <label htmlFor="name" className="col-span-4">
              Name<span className="text-red-500">*</span>
            </label>
            <Input
              required
              id="name"
              placeholder="name"
              value={asset?.name ? asset?.name : ""}
              className="col-span-6"
              onChange={(e) => setAsset({ ...asset, name: e.target.value })}
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
              value={asset?.price ? asset?.price : ""}
              className="col-span-4"
              onChange={(e) => setAsset({ ...asset, price: e.target.value })}
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
                asset?.purchase_date ? dateInput(asset?.purchase_date) : ""
              }
              className="col-span-4"
              onChange={(e) =>
                setAsset({ ...asset, purchase_date: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center">
            <label htmlFor="User" className="col-span-4">
              User
            </label>
            <Select
              defaultValue={asset?.user}
              isSearchable={false}
              options={userGroup}
              onChange={(value) => (
                setSelectedValue(value), setAsset({ ...asset, user: [value] })
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

          {asset?.logs &&
            asset?.logs.map((log, i) => (
              <div key={i} className="expand_border grid gap-4 p-4">
                <X
                  onClick={() => deleteLog(log._id)}
                  size={16}
                  className="text-red-500 absolute right-1 top-1 cursor-pointer"
                />
                <div className="grid grid-cols-4 items-center">
                  <label htmlFor="logMsg" className="col-span-4">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Input
                    required
                    id="logMsg"
                    placeholder="log message"
                    value={log.log ? log.log : ""}
                    className="col-span-4"
                    onChange={(e) =>
                      setAsset({
                        ...asset,
                        logs: asset.logs.map((el) => {
                          return {
                            ...el,
                            log: log.id === el.id ? e.target.value : el.log,
                          };
                        }),
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-4 items-center">
                  <label htmlFor="date" className="col-span-4">
                    Date
                  </label>
                  <Input
                    id="date"
                    type="date"
                    placeholder="date"
                    value={log.date ? dateInput(log.date) : log.date}
                    className="col-span-4"
                    onChange={(e) =>
                      setAsset({
                        ...asset,
                        logs: asset.logs.map((el) => {
                          return {
                            ...el,
                            date: log.id === el.id ? e.target.value : el.date,
                          };
                        }),
                      })
                    }
                  />
                </div>
              </div>
            ))}
        </div>
        <Button
          type="button"
          onClick={addLog}
          className="w-full mb-5 expand_border grid gap-4 bg-background text-text-color"
        >
          Add Log
        </Button>

        <DialogFooter>
          <Button type="submit">Save Asset</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default AssetForm;
