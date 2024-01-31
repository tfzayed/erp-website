import { arrayGroup } from "@/lib/arrayGroup";
import { ListSubheader, MenuItem } from "@mui/material";
import { useAppContext } from "context/state";

const useSelector = () => {
  const {
    userState: { users },
  } = useAppContext();

  // group users by department
  const userGroupedByDept = arrayGroup(users, "department");
  // select groups rendering
  const renderSelectGroup = (item) => {
    const items = item.users.map((p) => {
      return (
        <MenuItem key={p._id} value={p._id}>
          {p.name}
        </MenuItem>
      );
    });
    return [<ListSubheader>{item.name.toUpperCase()}</ListSubheader>, items];
  };
  return { selector: userGroupedByDept?.map((p) => renderSelectGroup(p)) };
};

export default useSelector;
