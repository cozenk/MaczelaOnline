"use client";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function UserInfo({
  user,
  showUserNavigation,
  setShowUserNavigation,
}) {
  return (
    <>
      {user ? user.first_name || user.email : "Guest"}
      {user?.image_url ? (
        <Image
          onClick={() => setShowUserNavigation((prev) => !prev)}
          src={user?.image_url}
          alt="user profile icon"
          width={35}
          height={35}
          className={`user-profile-img cursor-pointer rounded-full ${
            showUserNavigation ? "outline outline-2 outline-yellow-300" : ""
          }`}
        />
      ) : (
        <UserCircleIcon
          onClick={() => setShowUserNavigation((prev) => !prev)}
          className="user-profile-img w-8"
        />
      )}
    </>
  );
}
