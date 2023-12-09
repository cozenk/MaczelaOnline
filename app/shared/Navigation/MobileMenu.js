"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import UserAuth from "./UserAuth";
import icon from "@assets/icon.png";
import SlideMenu from "./SlideMenu";
import { useContext, useEffect } from "react";
import { NavContext } from "@providers/NavProvider";
import { CartContext } from "@providers/CartProvider";

export default function MobileMenu({ navigation = [] }) {
  const { cart } = useContext(CartContext);
  const { mobileMenuOpen, closeMobileMenu } = useContext(NavContext);

  useEffect(() => {
    if (cart.showMenu) closeMobileMenu();
  }, [cart.showMenu]);

  return (
    <SlideMenu isOpen={mobileMenuOpen} closeMenu={closeMobileMenu}>
      <div className="flex items-center justify-between">
        <a href="#" className="-m-1.5 flex items-center gap-2 p-1.5">
          <span className="sr-only">Your Company</span>
          <Image src={icon} width={35} height={35} alt="brand icon" />
          <span className="text-xl font-bold ">
            Maczela's <span className="text-red-600">Pizza</span>
          </span>
        </a>
        <button
          type="button"
          className="-m-2.5 rounded-md p-2.5 text-gray-700"
          onClick={closeMobileMenu}
        >
          <span className="sr-only">Close menu</span>
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-6 flow-root">
        <div className="-my-6 divide-y divide-gray-500/10">
          <div className="space-y-2 py-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  hover:bg-gray-50"
              >
                {item.name}
              </a>
            ))}
          </div>
          <UserAuth className="mt-5 !flex w-fit flex-col items-start gap-y-10" />
        </div>
      </div>
    </SlideMenu>
  );
}
