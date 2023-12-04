"use client";

import { CartContext } from "@providers/CartProvider";
import { useContext } from "react";

export default function Total() {
  const { cart } = useContext(CartContext);
  const shippingFee = 50;

  return (
    <div className="mt-10 border-t-2 pt-5">
      <div className="computation flex flex-col gap-y-4 border-b-2 pb-5">
        <div className="flex justify-between ">
          <p>Subtotal</p>
          <p className="text-lg">{cart.totalPriceDisplay}</p>
        </div>
        <div className="flex justify-between ">
          <p>Shipping</p>
          <p className="text-lg">₱{shippingFee}</p>
        </div>
      </div>

      <div className="flex justify-between py-5 text-xl font-semibold ">
        <p>Total</p>
        <input
          type="hidden"
          name="total-price"
          value={cart.totalPrice + shippingFee}
        />
        <p className="">₱{cart.totalPrice + shippingFee}</p>
      </div>
    </div>
  );
}
