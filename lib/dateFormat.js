import { format } from "date-fns";

const dateFormat = (date, pattern = "dd MMM, yyyy") => {
  if (!date || typeof date !== "string") return;
  const dateObj = new Date(date);
  const output = format(dateObj, pattern);
  return output;
};

export default dateFormat;
