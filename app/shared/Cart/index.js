"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { CartContext } from "@providers/CartProvider";
import { useContext } from "react";
import CartMenu from "./CartMenu";

export default function Cart() {
  const { cart, showCartMenu, closeCartMenu } = useContext(CartContext);

  return (
    <>
      <button
        onClick={showCartMenu}
        className="relative mt-[2px] text-sm font-semibold leading-6  dark:text-white"
      >
        <ShoppingCartIcon className="h-7 w-7" />
        <span
          className={
            "absolute right-0 top-0 flex h-7 w-7 translate-x-[60%] translate-y-[-50%] items-center justify-center rounded-full border border-black bg-yellow-300 text-lg dark:text-black"
          }
        >
          {cart.status !== "LOADING" ? cart.totalItems : null}
        </span>
      </button>

      {cart.status !== "LOADING" ? (
        <CartMenu isOpen={cart.showMenu} closeCartMenu={closeCartMenu} />
      ) : null}
    </>
  );
}
