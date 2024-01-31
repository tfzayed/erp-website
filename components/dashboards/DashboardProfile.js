import Image from "next/image";
import { Badge } from "../ui/badge";

function DashboardProfile({ session }) {
  return (
    <div className="flex items-center justify-between mb-10">
      <div className="flex items-center">
        <Image
          src={session?.sessionData?.user?.image}
          alt={session?.sessionData?.user?.name}
          height={64}
          width={64}
          className="rounded-full mr-2"
        />
        <h4>{session?.sessionData?.user?.name}</h4>
        {session?.sessionData?.admin && <Badge className="ml-2">Admin</Badge>}
      </div>
    </div>
  );
}

export default DashboardProfile;
