"use client";

import AssetCard from "@/component/cards/AssetCard";
import AssetForm from "@/component/form/AssetForm";
import { Button } from "@/component/ui/button";
import { Dialog, DialogTrigger } from "@/component/ui/dialog";
import { Table, TableHead, TableHeader, TableRow } from "@/component/ui/table";
import Axios from "@/lib/axios";
import { useAppContext } from "app/provider";
import { useState } from "react";

export default function Assets() {
  const {
    assetState: { loading, error, assets },
    assetDispatch,
    toastDispatch,
  } = useAppContext();

  const [open, setOpen] = useState(false);

  const [asset, setAsset] = useState({
    name: "",
    price: "",
    user: "",
    purchase_date: Date,
    logs: [
      {
        id: 1,
        log: "",
      },
    ],
  });

  const reset = () => {
    setAsset({
      ...asset,
      name: "",
      price: "",
      user: "",
      purchase_date: Date,
      log: [
        {
          id: 1,
          log: "",
        },
      ],
    });
  };

  //   add asset
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await Axios.post("asset", {
      asset,
    });
    if (res.status === 200) {
      reset();
      setOpen(false);
      assetDispatch({
        type: "ADD_ASSET",
        payload: asset,
      });
      toastDispatch({
        type: "TOAST",
        message: "ADD Successfully",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="mb-5">
            Add Asset
          </Button>
        </DialogTrigger>
        <AssetForm
          asset={asset}
          setAsset={setAsset}
          handleSubmit={handleSubmit}
        />
      </Dialog>

      <Table className="mb-10">
        <TableHeader>
          <TableRow>
            <TableHead>Expand</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Purchase Date</TableHead>
            <TableHead>Update</TableHead>
            <TableHead>Remove</TableHead>
          </TableRow>
        </TableHeader>
        {assets.map((asset, i) => (
          <AssetCard asset={asset} key={i} />
        ))}
      </Table>
    </>
  );
}
