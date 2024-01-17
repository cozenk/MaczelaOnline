"use client";

import { CartContext } from "@providers/CartProvider";
import { formatPrice } from "@utils/formatters";
import { useContext } from "react";

export default function Total() {
  const { cart } = useContext(CartContext);
  const deliveryFee = 50;

  return (
    <div className="mt-10 border-t-2 pt-5">
      <div className="computation flex flex-col gap-y-4 border-b-2 pb-5">
        <div className="flex justify-between ">
          <p>Subtotal</p>
          <p className="text-lg">{cart.totalPriceDisplay}</p>
        </div>
        <div className="flex justify-between ">
          <p>Delivery</p>
          <p className="text-lg">{formatPrice(deliveryFee)}</p>
        </div>
      </div>

      <div className="flex justify-between py-5 text-xl font-semibold ">
        <p>Total</p>
        <input
          type="hidden"
          name="total_price"
          value={cart.totalPrice + deliveryFee}
        />
        <p className="">{formatPrice(cart.totalPrice + deliveryFee)}</p>
      </div>
    </div>
  );
}
