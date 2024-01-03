"use client";

import { CartContext } from "@providers/CartProvider";
import { useContext, useState } from "react";

export default function ActionButtons({
  pizza = null,
  selectedVariant = null,
  onSelectVariant = () => {},
}) {
  const { addToCart, updateCartItem, showCartMenu, getPizzaById } =
    useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const addOrUpdate = () => {
    const existingPizza = getPizzaById(pizza.id);

    if (existingPizza) {
      updateCartItem(existingPizza.pizzaId, {
        price: selectedVariant.price || pizza.price,
        quantity: existingPizza.quantity + 1,
      });
    } else {
      addToCart({
        id: pizza.id,
        name: pizza.name,
        price: selectedVariant.price || pizza.price,
        quantity: 1,
        imageSrc: pizza.imageSrc,
        imageAlt: pizza.imageAlt,
        size: pizza.size,
      });
    }

    showCartMenu();
  };

  return (
    <div>
      <div className="sizes mb-10 flex items-center gap-2 text-black dark:text-white">
        <span className="w-16 text-xl font-bold dark:text-gray-400">
          Select size:
        </span>
        <select
          value={selectedVariant.name || pizza.size}
          name="size"
          id="size"
          className="w-28 dark:bg-black"
          onChange={(e) => {
            onSelectVariant({
              name: e.target.value,
              price:
                e.target.options[e.target.selectedIndex].getAttribute(
                  "data-price",
                ),
            });
          }}
        >
          <option value={pizza.size}>{pizza.size}</option>
          {pizza.variants.length > 0
            ? pizza.variants.map((variant) => (
                <option
                  key={variant.id}
                  value={variant.name}
                  data-price={variant.price}
                >
                  {variant.name}
                </option>
              ))
            : null}
        </select>
      </div>
      <div class="mb-8 w-32 ">
        <label
          for=""
          class="w-full text-xl font-semibold text-gray-700 dark:text-gray-400"
        >
          Quantity
        </label>
        <div class="relative mt-4 flex h-10 w-full flex-row rounded-lg bg-transparent">
          <button
            onClick={() => setQuantity((q) => (q > 1 ? q - 1 : q))}
            class="h-full w-20 cursor-pointer rounded-l bg-gray-300 text-gray-600 outline-none hover:bg-gray-400 hover:text-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <span class="m-auto text-2xl font-thin">-</span>
          </button>
          <input
            type="number"
            class="text-md flex w-full items-center bg-gray-300 text-center font-semibold text-gray-700 placeholder-gray-700 outline-none hover:text-black focus:outline-none dark:bg-gray-900 dark:text-gray-400 dark:placeholder-gray-400"
            defaultValue={quantity}
          />
          <button
            onClick={() => setQuantity((q) => q + 1)}
            class="h-full w-20 cursor-pointer rounded-r bg-gray-300 text-gray-600 outline-none hover:bg-gray-400 hover:text-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <span class="m-auto text-2xl font-thin">+</span>
          </button>
        </div>
      </div>
      <div class="-mx-4 flex flex-wrap items-center ">
        <div class="mb-4 w-full px-4 lg:mb-0 lg:w-1/2">
          <button
            onClick={addOrUpdate}
            class="flex w-full items-center justify-center rounded-md border border-green-500 p-4 text-green-500 hover:border-green-600 hover:bg-green-600 hover:text-gray-100 dark:border-green-600 dark:bg-green-600 dark:text-gray-200 dark:hover:border-green-700 dark:hover:bg-green-700 dark:hover:text-gray-300"
          >
            Add to Cart
          </button>
        </div>
        {/* <div class="mb-4 w-full px-4 lg:mb-0 lg:w-1/2">
          <button class="flex w-full items-center justify-center rounded-md border border-teal-500 p-4 text-teal-500 hover:border-teal-600 hover:bg-teal-600 hover:text-gray-100 dark:border-teal-600 dark:bg-teal-600 dark:text-gray-200 dark:hover:border-teal-700 dark:hover:bg-teal-700 dark:hover:text-gray-300">
            Add to wishlist
          </button>
        </div> */}
      </div>
    </div>
  );
}
