import dateFormat from "@/lib/dateFormat";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const CalendarTable = ({ calendar, reason }) => {
  return (
    <Table className="mb-5">
      <TableHeader>
        <TableRow>
          <TableHead>{reason}</TableHead>
          <TableHead className="w-[20%]">Start</TableHead>
          <TableHead className="w-[20%]">End</TableHead>
          <TableHead className="w-[10%]">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {calendar?.length > 0 &&
          calendar?.map((el, i) => (
            <TableRow key={i}>
              <TableCell className="border-b">{el?.reason}</TableCell>
              <TableCell className="border-b">
                {dateFormat(el?.start_date)}
              </TableCell>
              <TableCell className="border-b">
                {dateFormat(el?.end_date)}
              </TableCell>
              <TableCell className="border-b">
                {el?.day_count} {el?.day_count > 1 ? "days" : "day"}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default CalendarTable;
