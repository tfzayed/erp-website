import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminDashboard from "@/component/dashboards/AdminDashboard";
import DashboardProfile from "@/component/dashboards/DashboardProfile";
import UserDashboard from "@/component/dashboards/UserDashboard";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <DashboardProfile session={session} />
      {session?.sessionData?.admin ? (
        <AdminDashboard />
      ) : (
        <UserDashboard userEmail={session?.sessionData?.user?.email} />
      )}
    </div>
  );
}
