"use client";

import { EditIcon } from "lucide-react";
import UserInfo from "./UserInfo";
import Link from "next/link";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";
import { NavContext } from "@providers/NavProvider";
import { CartContext } from "@providers/CartProvider";

export default function UserNavigation({ user }) {
  const { showUserNavigation, setShowUserNavigation, showEditUserInfo } =
    useContext(NavContext);

  const { resetClientCart } = useContext(CartContext);

  const queryClient = useQueryClient();
  const pathname = usePathname();

  useEffect(() => {
    if (showUserNavigation) {
      const handler = (event) => {
        if (
          !event.target.closest(".user-navigation") &&
          !event.target.closest(".user-profile-img")
        ) {
          setShowUserNavigation(false);
        }
      };
      document.addEventListener("click", handler);

      return () => {
        document.removeEventListener("click", handler);
      };
    }
  }, [showUserNavigation]);

  const getTextAndHrefFromRole = () => {
    switch (user.role) {
      case "ADMIN":
        return { href: "/admin", text: "Admin" };

      case "STAFF":
        return { href: "/admin", text: "Staff" };

      case "DELIVERY_RIDER":
        return { href: "/admin/orders", text: "Delivery Rider" };

      default:
        return { href: "/admin", text: user.role };
    }
  };

  return (
    <div className="user-navigation relative flex items-center gap-3 font-medium">
      <UserInfo
        user={user}
        showUserNavigation={showUserNavigation}
        setShowUserNavigation={setShowUserNavigation}
      />
      {showUserNavigation ? (
        <div className="navigation absolute bottom-0 right-0 z-50 w-max max-w-[30rem] translate-x-[-10%] translate-y-[100%] overflow-x-auto rounded-xl border border-gray-300 bg-white p-5 md:translate-x-[0%]">
          {user ? (
            <>
              <div className="info mb-4 flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-x-2 text-black">
                  <span className="text-gray-600">Name:</span>{" "}
                  {user.full_name ? (
                    <div className="flex items-center gap-x-2">
                      {user.full_name}{" "}
                      <EditIcon
                        className="modal-trigger cursor-pointer text-green-700 hover:text-green-500"
                        width={16}
                        onClick={() => showEditUserInfo("first_name")}
                      />
                    </div>
                  ) : (
                    <span
                      className="modal-trigger cursor-pointer text-green-700"
                      onClick={() => showEditUserInfo("first_name")}
                    >
                      Add +
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-x-2 text-black ">
                  <span className="text-gray-600">Email:</span>
                  {user.email ? (
                    <div className="flex items-center gap-x-2">
                      {user.email}{" "}
                      <EditIcon
                        className="modal-trigger cursor-pointer text-green-700 hover:text-green-500"
                        width={16}
                        onClick={() => showEditUserInfo("email")}
                      />
                    </div>
                  ) : (
                    <span
                      className="modal-trigger cursor-pointer text-green-700"
                      onClick={() => showEditUserInfo("email")}
                    >
                      Add +
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-x-2 text-black ">
                  <span className="text-gray-600">Mobile number: </span>{" "}
                  {user.mobile_number ? (
                    <div className="flex items-center gap-x-2">
                      {user.mobile_number}{" "}
                      <EditIcon
                        className="modal-trigger cursor-pointer text-green-700 hover:text-green-500"
                        width={16}
                        onClick={() => showEditUserInfo("mobile_number")}
                      />
                    </div>
                  ) : (
                    <span
                      className="modal-trigger cursor-pointer text-green-700"
                      onClick={() => showEditUserInfo("mobile_number")}
                    >
                      Add +
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-x-2 text-black ">
                  <span className="text-gray-600">Address: </span>{" "}
                  {user.address ? (
                    <div className="flex items-center gap-x-2">
                      <span className="w-[13rem] overflow-hidden text-ellipsis whitespace-nowrap">
                        {user.address}
                      </span>{" "}
                      <EditIcon
                        className="modal-trigger cursor-pointer text-green-700 hover:text-green-500"
                        width={16}
                        onClick={() => showEditUserInfo("complete_address")}
                      />
                    </div>
                  ) : (
                    <span
                      className="modal-trigger cursor-pointer text-green-700"
                      onClick={() => showEditUserInfo("complete_address")}
                    >
                      Add +
                    </span>
                  )}
                </div>
                <div className="my-2 flex flex-col gap-y-2">
                  {user.role !== "CUSTOMER" && !pathname.includes("/admin") ? (
                    <Link
                      href={getTextAndHrefFromRole().href}
                      className="text-base text-black underline hover:text-gray-600"
                    >
                      Go to {getTextAndHrefFromRole().text} Panel
                    </Link>
                  ) : null}

                  <Link
                    href={"/my-orders"}
                    className="text-base text-black underline hover:text-gray-600"
                  >
                    See my orders{" "}
                  </Link>
                </div>
              </div>
              <SignOutButton
                signOutCallback={() => {
                  queryClient.invalidateQueries({
                    queryKey: ["current-user"],
                  });
                  resetClientCart();
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
    </div>
  );
}
