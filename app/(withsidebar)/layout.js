import Logo from "@/component/Logo";
import SingOutBtn from "@/component/dashboards/SingOut";
import Sidebar from "@/layouts/Sidebar";
import "@/styles/main.scss";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="relative min-h-screen md:flex">
      <input type="checkbox" id="menu-open" className="hidden" />

      <header className="bg-dark text-gray-100 flex justify-between md:hidden">
        <Link
          href="/"
          className="block p-4 text-white font-bold whitespace-nowrap truncate"
        >
          Teamosis ERP
        </Link>

        <label
          htmlFor="menu-open"
          id="mobile-menu-button"
          className="m-2 p-2 focus:outline-none hover:text-white hover:bg-gray-700 rounded-md"
        >
          <svg
            id="menu-open-icon"
            className="h-6 w-6 transition duration-200 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            id="menu-close-icon"
            className="h-6 w-6 transition duration-200 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </label>
      </header>

      {/* large device */}
      <aside
        id="sidebar"
        className="bg-light min-w-fit w-1/6 py-6 absolute inset-y-0 left-0 transform md:translate-x-0 transition duration-200 ease-in-out md:flex md:flex-col md:justify-between overflow-y-auto z-10 h-screen md:sticky"
      >
        <div className="flex flex-col justify-between mx-6 h-full">
          <div>
            <Logo />
            <nav className="mt-5">
              <Sidebar user={session?.sessionData?.admin} />
            </nav>
          </div>
          <SingOutBtn
            profileImg={session?.sessionData?.user?.image}
            profileName={session?.sessionData?.user?.name}
          />
        </div>
      </aside>

      <main id="content" className="flex-1 p-6 lg:px-8 md:w-5/6">
        <div className="mx-auto">{children}</div>
      </main>
    </div>
  );
}
