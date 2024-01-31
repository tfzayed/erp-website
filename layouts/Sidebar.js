"use client";

import { Button } from "@/component/ui/button";
import menu from "@/config/menu.json";
import Icon from "@/lib/icon";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ user }) {
  const pathname = usePathname();

  return (
    <>
      {user
        ? menu
            ?.filter((item) => item.admin)
            .map((item, i) => (
              <div key={i}>
                <div
                  className={`rounded-md mb-2 ${
                    pathname === item?.url
                      ? "bg-primary text-white hover:bg-opacity-80"
                      : "hover:bg-primary/5"
                  }`}
                >
                  <Link href={item?.url}>
                    <Button
                      variant="ghost"
                      className="flex items-center justify-start lg:px-4 py-2 w-full"
                    >
                      <div>
                        <Icon name={item?.icon} size={24} className="mr-5" />
                      </div>
                      {item?.name}
                    </Button>
                  </Link>
                </div>
              </div>
            ))
        : menu
            ?.filter((item) => item.user)
            .map((item, i) => (
              <div key={i}>
                <div
                  className={`rounded-md mb-2 ${
                    pathname === item?.url
                      ? "bg-primary text-white hover:bg-opacity-80"
                      : "hover:bg-primary/5"
                  }`}
                >
                  <Link href={item?.url}>
                    <Button
                      variant="ghost"
                      className="flex items-center justify-start lg:px-4 py-2 w-full"
                    >
                      <div>
                        <Icon name={item?.icon} size={24} className="mr-5" />
                      </div>
                      {item?.name}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
    </>
  );
}
