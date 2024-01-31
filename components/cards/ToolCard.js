"use client";

import { useAppContext } from "@/app/provider";
import Axios from "@/lib/axios";
import dateFormat from "@/lib/dateFormat";
import { ChevronDown, Trash } from "lucide-react";
import { useState } from "react";
import UpdateTool from "../tools/UpdateTool";
import { Badge } from "../ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { Toggle } from "../ui/toggle";

const ToolCard = ({ tool }) => {
  const [toolDeleteModal, setToolDeleteModal] = useState(false);

  const {
    toolDispatch,
    filterOrganizationDisPatch,
    filterOrganizationState: { organization: filterOrg, tools: filterTool },
    toastDispatch,
    userState: { users },
  } = useAppContext();

  // delete tool
  const deleteTool = async () => {
    const res = await Axios.delete(`tool/${tool._id}`);

    if (res.status === 200) {
      toolDispatch({
        type: "DELETE_TOOL",
        id: tool._id,
      });
      toastDispatch({
        type: "TOAST",
        message: "Delete Tool",
      });
      setToolDeleteModal(false);
    }
  };

  return (
    <TableBody>
      <Collapsible asChild>
        <>
          <TableRow>
            <TableCell>
              <CollapsibleTrigger asChild>
                <Toggle aria-label="Toggle italic">
                  <ChevronDown className="" />
                </Toggle>
              </CollapsibleTrigger>
            </TableCell>
            <TableCell>{tool?.platform}</TableCell>
            <TableCell>${parseFloat(tool?.price).toFixed(2)}</TableCell>
            <TableCell>{dateFormat(tool?.purchase_date)}</TableCell>
            <TableCell>{dateFormat(tool?.expire_date)}</TableCell>
            <TableCell>
              <UpdateTool tool={tool} />
            </TableCell>
            <TableCell>
              <Trash
                onClick={() => deleteTool(tool?._id)}
                style={{ color: "red" }}
              />
            </TableCell>
          </TableRow>
          <CollapsibleContent asChild>
            <TableRow>
              <TableCell colSpan={8}>
                {/* tools */}
                {tool.organization.map((org, i) => (
                  <div key={i} className="expand_border mb-2">
                    <h5 className="mb-3">{org.name}</h5>
                    <div className="flex items-center">
                      <h6 className="mr-2">Users:</h6>
                      {users
                        .filter((user) => org.users.includes(user.user_id))
                        .map((user, i) => (
                          <Badge key={i} variant="outline" className="mr-2">
                            {user.name}
                          </Badge>
                        ))}
                    </div>
                  </div>
                ))}
              </TableCell>
            </TableRow>
          </CollapsibleContent>
        </>
      </Collapsible>
    </TableBody>
  );
};

export default ToolCard;
