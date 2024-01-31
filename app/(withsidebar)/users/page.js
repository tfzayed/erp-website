import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserCard from "@/component/cards/UserCard";
import UserForm from "@/component/form/UserForm";
import { Table, TableHead, TableHeader, TableRow } from "@/component/ui/table";
import { getServerSession } from "next-auth";

export default async function Users() {
  const session = await getServerSession(authOptions);
  const admin = session?.sessionData?.admin;

  return (
    <>
      {admin && <UserForm />}

      <Table className="mb-10">
        <TableHeader>
          <TableRow>
            <TableHead>Expand</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Update</TableHead>
            {admin && <TableHead>Remove</TableHead>}
          </TableRow>
        </TableHeader>

        <UserCard admin={admin} />
      </Table>
    </>
  );
}
