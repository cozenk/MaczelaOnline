"use client";

import { CartContext } from "@providers/CartProvider";
import SlideMenu from "../Navigation/SlideMenu";
import { useContext } from "react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import CartItems from "./CartItems";
import { Button } from "@shared/Button";

export default function CartMenu({ isOpen = false, closeCartMenu = () => {} }) {
  const { cart } = useContext(CartContext);
  const { isSignedIn } = useUser();

  return (
    <SlideMenu isOpen={isOpen} closeMenu={closeCartMenu}>
      <div className="mb-10 flex items-center justify-between">
        <a href="#" className="-m-1.5 flex items-center gap-2 p-1.5">
          <span className="sr-only">My Cart</span>

          <span className="text-lg font-bold  dark:text-white">
            My <span className="">Cart</span>
          </span>
        </a>
        <Button
          className="mr-4"
          onClick={closeCartMenu}
          variant="outline"
          size="icon"
        >
          <span className="sr-only">Close menu</span>
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </Button>
      </div>

      <div className="content flex h-[90%] flex-col justify-between">
        {cart.cartItems?.length > 0 ? (
          <>
            <CartItems />
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between font-medium  dark:text-white">
                <p>Subtotal</p>
                <p className="text-xl">{cart.totalPriceDisplay}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                Delivery and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                {!isSignedIn ? (
                  <SignInButton afterSignInUrl="/checkout">
                    <div className="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700">
                      Checkout
                    </div>
                  </SignInButton>
                ) : (
                  <Link
                    href={"/checkout"}
                    className="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700"
                  >
                    Checkout
                  </Link>
                )}
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <button
                    type="button"
                    className="font-medium text-green-600 hover:text-green-500"
                    onClick={closeCartMenu}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-y-4 pt-12 text-center">
            <ShoppingCartIcon className="w-32" />
            <h2 className="w-[70%] text-2xl md:w-[80%]">
              Add to cart na 'yan inzaaan 👉👈🥺
            </h2>
          </div>
        )}
      </div>
    </SlideMenu>
  );
}
