"use client";

import ContactInformation from "./components/ContactInformation";
import ShippingAddress from "./components/ShippingAddress";
import OrderSummary from "./components/OrderSummary";
import icon from "@assets/icon.png";
import Image from "next/image";
import { submitOrder } from "./actions";

import { useFormState } from "react-dom";
import { useContext, useEffect } from "react";
import { CartContext } from "@providers/CartProvider";
import Link from "next/link";
import {
  HomeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

export default function Checkout() {
  const { cart } = useContext(CartContext);
  const submitOrderWithCartItems = submitOrder.bind(null, cart.cartItems);
  const [state, formAction] = useFormState(submitOrderWithCartItems, {
    orderSubmitted: false,
    isError: false,
  });

  if (state.isError) {
    // show error modal
  }

  useEffect(() => {
    if (state.orderSubmitted) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }
  }, []);

  return (
    <>
      {state.orderSubmitted ? (
        <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 transition-opacity">
          <div className="overlay-content absolute left-1/2 top-1/2 flex w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-between rounded-xl  bg-white p-14">
            <div className="text-center text-black">
              <h2 className="text-2xl font-semibold tracking-wide">
                Order submitted
              </h2>
              <p className="mt-2 text-lg">
                We will contact you shortly to confirm your order
              </p>
            </div>

            <div className="mt-6 flex w-full flex-wrap items-center gap-5">
              <Link
                href={"/my-orders"}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700"
              >
                See my orders <ShoppingBagIcon className="w-6" />
              </Link>
              <Link
                href={"/"}
                className="flex w-full items-center justify-center gap-2 font-medium text-black hover:text-gray-500"
              >
                Back to home <HomeIcon className="w-6" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {cart.cartItems.length > 0 ? (
        <form
          action={formAction}
          className="grid grid-cols-1 items-center lg:grid-cols-2"
        >
          <div className="overflow-y-auto px-8 pb-16 pt-10 lg:h-[100vh] lg:px-16">
            <div className="mb-12 flex items-center gap-2">
              <Image src={icon} width={35} height={35} alt="brand-icon" />
              <span className="text-2xl font-semibold">
                Check<span className="text-red-600">out</span>
              </span>
            </div>

            <ContactInformation />
            <ShippingAddress />
            {/* <BillingAddress /> */}
          </div>
          <div className="overflow-y-auto bg-gray-50 px-8 py-16 dark:bg-gray-800 lg:h-[100vh] lg:px-20">
            <OrderSummary />
          </div>
        </form>
      ) : (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-10">
          {cart.status === "LOADING" ? (
            <h2>Loading cart...</h2>
          ) : (
            <>
              <h2 className="flex gap-4 text-4xl">
                Empty cart <ShoppingCartIcon className="w-10" />
              </h2>
              <Link
                className="rounded-md border border-black px-4 py-2 hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
                href={"/#menu"}
              >
                Add something first
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}
