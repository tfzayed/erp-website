import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Calendar from "@/component/calendar/Calendar";
import { getServerSession } from "next-auth";
import "react-big-calendar/lib/css/react-big-calendar.css";

export default async function page() {
  const session = await getServerSession(authOptions);
  const admin = session?.sessionData?.admin;

  return (
    <>
      <Calendar admin={admin} />
    </>
  );
}
