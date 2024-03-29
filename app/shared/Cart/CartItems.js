"use client";

import { Button } from "@shared/Button";
import { CartContext } from "@providers/CartProvider";
import { priceRegex } from "@utils/regex";
import { Trash2Icon, MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { Popover, PopoverContent, PopoverTrigger } from "@shared/Popover";
import AddOnsSelection from "./AddOnsSelection";
import { formatPrice } from "@utils/formatters";

export default function CartItems({ imageSize }) {
  const {
    cart,
    updateCartItem,
    updateItemTypedQuantity,
    updateItemSelectedAddOns,
    removeAllCartItems,
  } = useContext(CartContext);

  return (
    <div className="cart-items">
      {cart.status !== "LOADING" ? (
        <>
          <input type="hidden" name="total-items" value={cart.totalItems} />
          <div className="flex justify-end">
            <Button
              variant="ghost"
              className="gap-2"
              onClick={removeAllCartItems}
            >
              Remove all <Trash2Icon size={16} />
            </Button>
          </div>
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
                  <div>
                    {item.selectedAddOns.length > 0 ? (
                      <div className="text-xs text-neutral-500">
                        <span>Addons:</span>
                        <ul>
                          {item.selectedAddOns.map((addOn) => (
                            <li key={addOn.id}>
                              - {addOn.label} (+
                              {formatPrice(addOn.additionalPrice, {
                                withoutDecimals: true,
                              })}
                              )
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          className="-ml-1 flex h-7 items-center gap-1 rounded-full"
                          variant={"outline"}
                          size="sm"
                        >
                          Add ons <PlusIcon size={16} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <AddOnsSelection
                          selectedAddOns={item.selectedAddOns}
                          onChangeSelectedAddOns={(value, addOn) => {
                            if (value)
                              updateItemSelectedAddOns(item.pizzaId, [
                                ...item.selectedAddOns,
                                addOn,
                              ]);
                            else
                              updateItemSelectedAddOns(
                                item.pizzaId,
                                item.selectedAddOns.filter(
                                  (selected) => selected.id !== addOn.id,
                                ),
                              );
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              <div className="mb-1 flex flex-col items-end justify-between self-stretch">
                <h2 className="mr-2 text-lg font-medium">
                  {item.displayPrice}
                </h2>
                <div className="quantity-control flex w-24 items-center justify-between rounded-full border border-black px-2 py-1 dark:border-white">
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
                  <input
                    value={
                      item.typedQuantity !== null
                        ? item.typedQuantity
                        : item.quantity
                    }
                    size={1}
                    className="pl-3"
                    onChange={(e) => {
                      if (priceRegex.test(e.target.value))
                        updateItemTypedQuantity(
                          item.pizzaId,
                          Number(e.target.value),
                        );
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.target.blur();
                      }
                    }}
                    onBlur={(e) => {
                      const quantity = Number(e.target.value);
                      if (quantity === 0) {
                        if (confirm("Remove this item from cart?"))
                          updateCartItem(item.pizzaId, {
                            quantity: quantity,
                          });
                        else
                          updateItemTypedQuantity(item.pizzaId, item.quantity);
                      } else
                        updateCartItem(item.pizzaId, {
                          quantity: quantity,
                        });
                    }}
                  />
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
