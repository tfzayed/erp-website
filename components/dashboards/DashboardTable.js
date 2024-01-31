import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const DashboardTable = ({ name, priceHead, total, data }) => {
  return (
    <Table className="mb-10">
      <TableHeader>
        <TableRow>
          <TableHead>{name}</TableHead>
          <TableHead className="text-right">{priceHead}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((el, i) => (
          <TableRow key={i} className="border-b border-x">
            <TableCell className="font-medium">
              {el?.name ? el?.name : el?.platform}
            </TableCell>
            <TableCell className="text-right">
              ${parseFloat(el?.price).toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="font-medium">Total</TableCell>
          <TableCell className="text-right">
            ${parseFloat(total).toFixed(2)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default DashboardTable;
