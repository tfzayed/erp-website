import SessionProvider from "@/component/SessionProvider";
import "@/styles/main.scss";
import { getServerSession } from "next-auth";
import { AppWrapper } from "./provider";

export const metadata = {
  title: "Teamosis ERP",
  description: "Teamosis ERP",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <AppWrapper>{children}</AppWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
