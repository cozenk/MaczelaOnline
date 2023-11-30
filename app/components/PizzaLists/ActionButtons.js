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
      });
    }

    showCartMenu();
  };

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={addOrUpdate}
        className="rounded-md px-2.5 py-1.5 text-sm font-semibold text-green-600 shadow-sm outline hover:bg-green-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      >
        Add to cart
      </button>
      <div className="sizes flex items-center justify-end gap-2 text-black">
        <span className="text-gray-600">Select size:</span>
        <select defaultValue={10} name="size" id="size" className="w-28">
          <option value={10}>Medium 10"</option>
          <option value={12}>Large 12"</option>
          <option value={20}>Super Large 20"</option>
        </select>
      </div>
    </div>
  );
}
