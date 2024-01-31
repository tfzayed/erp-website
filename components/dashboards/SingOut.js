"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { Button } from "../ui/button";

export default function SingOutBtn({ profileImg, profileName }) {
  return (
    <Button
      onClick={() => signOut()}
      className="w-full bg-background flex items-center justify-between px-4 py-2"
      size="56"
    >
      <div className="flex items-center ">
        <Image
          src={profileImg}
          alt={`${profileName} profile pic`}
          height={45}
          width={45}
          className="rounded-full mr-2"
        />
        <p className="text-text-dark">{profileName?.split(" ").shift()}</p>
      </div>

      <LogOut color="#121212" size={24} strokeWidth={2} absoluteStrokeWidth />
    </Button>
  );
}
