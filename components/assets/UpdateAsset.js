"use client";

import { useAppContext } from "@/app/provider";
import Axios from "@/lib/axios";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import AssetForm from "../form/AssetForm";
import { Dialog, DialogTrigger } from "../ui/dialog";

const UpdateAsset = ({ asset }) => {
  //   call users
  const {
    assetDispatch,
    toastDispatch,
    userState: { users },
    filterAssetsDisPatch,
  } = useAppContext();

  const [open, setOpen] = useState(false);

  const [updateAsset, setUpdateAsset] = useState([]);
  useEffect(() => {
    users?.length > 0 &&
      setUpdateAsset({
        name: asset.name,
        price: asset.price,
        user: asset?.user
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
        purchase_date: asset.purchase_date,
        logs: asset.logs,
        id: asset._id,
      });
  }, [users]);

  //   reset asset
  const reset = () => {
    setUpdateAsset({
      ...updateAsset,
      name: updateAsset.name,
      price: updateAsset.price,
      user: updateAsset.user,
      purchase_date: updateAsset.purchase_date,
      logs: updateAsset.logs,
    });
  };

  // open form modal
  const handleOpen = (id) => {
    filterAssetsDisPatch({
      type: "SINGLE_ASSET",
      id: asset._id,
    });
  };

  //   add asset
  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await Axios.patch(`asset/${asset._id}`, {
      updateAsset,
    });
    if (res.status === 200) {
      reset();
      setOpen(false);
      assetDispatch({
        type: "UPDATE_ASSETS",
        payload: updateAsset,
        id: asset._id,
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
            onClick={() => handleOpen(asset._id)}
            style={{ color: "green" }}
            className="cursor-pointer"
          />
        </DialogTrigger>
        <AssetForm
          handleSubmit={handleUpdate}
          asset={updateAsset}
          setAsset={setUpdateAsset}
        />
      </Dialog>
    </>
  );
};

export default UpdateAsset;
