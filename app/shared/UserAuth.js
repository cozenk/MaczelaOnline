"use client";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import Cart from "./Cart";
import { useCurrentUser } from "./hooks";
import Image from "next/image";
import { useEffect, useContext, useState } from "react";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { CartContext } from "@providers/CartProvider";
import Link from "next/link";

export default function UserAuth({ className = "" }) {
  const { resetClientCart } = useContext(CartContext);
  const [showUserButton, setShowUserButton] = useState(false);
  const { user, isLoading } = useCurrentUser();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (showUserButton) {
      const handler = (event) => {
        console.log(event.target);
        if (
          !event.target.closest(".user-buttons") &&
          !event.target.closest(".user-profile-img")
        ) {
          setShowUserButton(false);
        }
      };
      document.addEventListener("click", handler);

      return () => {
        document.removeEventListener("click", handler);
      };
    }
  }, [showUserButton]);

  return (
    <div
      className={`cart mr-5 hidden gap-10 md:flex md:justify-end lg:flex-1 ${className}`}
    >
      {isLoading ? (
        "Loading..."
      ) : (
        <span className="relative flex items-center gap-3 font-medium">
          {user?.first_name || "Guest"}
          {user?.image_url ? (
            <Image
              onClick={() => setShowUserButton((prev) => !prev)}
              src={user?.image_url}
              alt="user profile icon"
              width={35}
              height={35}
              className={`user-profile-img cursor-pointer rounded-full ${
                showUserButton ? "outline outline-2 outline-yellow-300" : ""
              }`}
            />
          ) : (
            <UserCircleIcon
              onClick={() => setShowUserButton((prev) => !prev)}
              className="user-profile-img w-8"
            />
          )}

          {showUserButton ? (
            <div className="user-buttons absolute bottom-0 right-0 z-50 w-[300%] translate-x-[60%] translate-y-[100%] rounded-xl border border-gray-300 bg-white p-5 md:translate-x-0">
              {user ? (
                <>
                  <div className="info mb-4 flex flex-col gap-2 text-sm">
                    <div className="text-black">
                      <span className="text-gray-600">Name:</span>{" "}
                      {user.first_name} {user.last_name}
                    </div>
                    <div className="text-black">
                      <span className="text-gray-600">Email:</span> {user.email}
                    </div>
                    <div className="text-black">
                      <span className="text-gray-600">Mobile number: </span>{" "}
                      {user.mobile_number || (
                        <span className="cursor-pointer text-green-700">
                          Add +
                        </span>
                      )}
                    </div>
                    <div className="my-2">
                      <Link
                        href={"/my-orders"}
                        className="text-base text-black underline hover:text-gray-600"
                      >
                        See my orders{" "}
                      </Link>{" "}
                    </div>
                  </div>
                  <SignOutButton
                    signOutCallback={() => {
                      resetClientCart();
                      queryClient.invalidateQueries({ queryKey: ["user"] });
                    }}
                  >
                    <h2 className="cursor-pointer text-red-600 hover:text-red-700">
                      Logout
                    </h2>
                  </SignOutButton>
                </>
              ) : (
                <SignInButton>
                  <h2 className="cursor-pointer text-green-600 hover:text-green-700">
                    Login
                  </h2>
                </SignInButton>
              )}
            </div>
          ) : null}
        </span>
      )}
      <Cart />
    </div>
  );
}
