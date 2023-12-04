"use client";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { CartContext } from "@providers/CartProvider";
import Image from "next/image";
import { useContext } from "react";
import Skeleton from "react-loading-skeleton";

export default function CartItems({ imageSize }) {
  const { cart, updateCartItem } = useContext(CartContext);

  return (
    <div className="cart-items">
      {cart.status !== "LOADING" ? (
        <>
          <input type="hidden" name="total-items" value={cart.totalItems} />
          {cart.cartItems.map((item, index) => (
            <div
              key={item.pizzaId}
              className={`my-4 flex items-start justify-between ${
                index !== cart.cartItems.length - 1 ? "border-b-2 pb-5" : ""
              }`}
            >
              <div className="flex gap-5">
                <Image
                  className={`${
                    imageSize ? `w-${imageSize} h-${imageSize}` : "h-20 w-20"
                  } rounded border border-black`}
                  src={item.imageSrc}
                  width={100}
                  height={100}
                  alt={item.imageAlt || "cart item pizza image"}
                />
                <div>
                  <h2 className="text-lg font-medium">{item.name}</h2>
                  <span className="variant text-md text-gray-600 dark:text-gray-400">
                    {item.size}
                  </span>
                </div>
              </div>

              <div className="mb-1 flex flex-col items-end justify-between self-stretch">
                <h2 className="mr-2 text-lg font-medium">
                  {item.displayPrice}
                </h2>
                <div className="quantity-control flex w-28 items-center justify-between rounded-full border border-black px-2 py-1 dark:border-white">
                  <MinusIcon
                    onClick={() => {
                      if (item.quantity === 1) {
                        if (confirm("Remove this item from cart?"))
                          updateCartItem(item.pizzaId, {
                            quantity: item.quantity - 1,
                          });
                      } else
                        updateCartItem(item.pizzaId, {
                          quantity: item.quantity - 1,
                        });
                    }}
                    className="w-5 cursor-pointer text-gray-600 hover:text-gray-400 dark:text-gray-400 hover:dark:text-gray-200"
                  />{" "}
                  {item.quantity}{" "}
                  <PlusIcon
                    onClick={() =>
                      updateCartItem(item.pizzaId, {
                        quantity: item.quantity + 1,
                      })
                    }
                    className="w-5 cursor-pointer text-gray-600 hover:text-gray-400 dark:text-gray-400 hover:dark:text-gray-200"
                  />
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <Skeleton height={100} count={3} enableAnimation />
      )}
    </div>
  );
}
