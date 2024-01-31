"use client";

import { useAppContext } from "@/app/provider";
import Axios from "@/lib/axios";
import dateFormat from "@/lib/dateFormat";
import { ChevronDown, Trash } from "lucide-react";
import UpdateAsset from "../assets/UpdateAsset";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { Toggle } from "../ui/toggle";

const AssetCard = ({ asset }) => {
  const {
    toastDispatch,
    assetDispatch,
    filterAssetsDisPatch,
    userState: { users },
    filterAssetsState: { assets: filterAsset },
  } = useAppContext();

  // delete asset
  const deleteAsset = async () => {
    const res = await Axios.delete(`asset/${asset._id}`);
    if (res.status === 200) {
      assetDispatch({
        type: "DELETE_ASSETS",
        id: asset._id,
      });
      toastDispatch({
        type: "TOAST",
        message: "Delete Successfully",
      });
    }
  };

  return (
    <>
      <TableBody>
        <Collapsible asChild>
          <>
            <TableRow>
              <TableCell>
                <CollapsibleTrigger asChild>
                  <Toggle aria-label="Toggle italic">
                    <ChevronDown />
                  </Toggle>
                </CollapsibleTrigger>
              </TableCell>
              <TableCell>{asset?.name}</TableCell>
              <TableCell>${parseFloat(asset?.price).toFixed(2)}</TableCell>
              <TableCell>
                {users
                  .filter((user) =>
                    typeof asset?.user[0] === "string"
                      ? asset?.user[0]?.toString() === user.user_id
                      : asset?.user[0]?.value?.toString() === user.user_id
                  )
                  .map((user) => user.name)}
              </TableCell>
              <TableCell>{dateFormat(asset?.purchase_date)}</TableCell>
              <TableCell>
                <UpdateAsset asset={asset} />
              </TableCell>
              <TableCell>
                <Trash
                  onClick={() => deleteAsset(asset?._id)}
                  style={{ color: "red" }}
                />
              </TableCell>
            </TableRow>
            <CollapsibleContent asChild>
              <TableRow>
                <TableCell colSpan={8}>
                  {asset.logs.map((item, i) => (
                    <div className="expand_border mb-2" key={`tool-box-${i}`}>
                      <div className="flex mb-2">
                        <h6 className="mr-1">Log: </h6>
                        <p>{item.log}</p>
                      </div>
                      <div className="flex">
                        <h6>Date:</h6> <p>{dateFormat(item.date)}</p>
                      </div>
                    </div>
                  ))}
                </TableCell>
              </TableRow>
            </CollapsibleContent>
          </>
        </Collapsible>
      </TableBody>
    </>
  );
};

export default AssetCard;
