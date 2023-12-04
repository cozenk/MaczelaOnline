"use client";

import { CartContext } from "@providers/CartProvider";
import { useContext } from "react";

export default function ActionButtons({ pizza }) {
  const { cart, addToCart, updateCartItem, showCartMenu } =
    useContext(CartContext);

  const addOrUpdate = () => {
    console.log(pizza);
    const existingProduct = cart.cartItems.find(
      (item) => item.pizzaId === pizza.id,
    );
    if (existingProduct) {
      updateCartItem(pizza.id, {
        quantity: existingProduct.quantity + 1,
      });
    } else {
      addToCart({
        id: pizza.id,
        name: pizza.name,
        price: pizza.price,
        quantity: 1,
        imageSrc: pizza.imageSrc,
        imageAlt: pizza.imageAlt,
        size: pizza.size,
      });
    }

    showCartMenu();
  };

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={addOrUpdate}
        className="rounded-md px-2.5 py-1.5 text-sm font-semibold text-green-600 shadow-sm outline hover:bg-green-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 dark:text-green-300 dark:hover:bg-green-300 dark:hover:text-black dark:focus-visible:outline-green-300"
      >
        Add to cart
      </button>
      <div className="sizes flex items-center justify-end gap-2 text-black dark:text-white">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Select size:
        </span>
        <select
          defaultValue={pizza.size}
          name="size"
          id="size"
          className="w-28 dark:bg-black"
        >
          <option value={`Medium 10"`}>Medium 10"</option>
          <option value={`Large 12"`}>Large 12"</option>
          <option value={`Super 20"`}>Super 20"</option>
        </select>
      </div>
    </div>
  );
}
