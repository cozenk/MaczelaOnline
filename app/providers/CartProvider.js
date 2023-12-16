"use client";

import { setLocalStorageItem } from "@utils/localStorage";
import { createContext, useEffect, useMemo, useState } from "react";
import {
  useSyncLocalStorageCartToComputedCart,
  useBackendCartMutation,
  useFetchCartBackend,
  useSyncClientCartToBackendCart,
} from "./hooks";
import { useIsMutating } from "@tanstack/react-query";

export const CartContext = createContext({});

const initialState = {
  showMenu: false,
  status: "LOADING",
  cartItems: [],
  action: null,
};

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(initialState);

  const { data: cartBackend } = useFetchCartBackend({
    initialState,
    clientCart: cart,
  });
  const backendCartMutation = useBackendCartMutation();

  const computedCart = useMemo(() => {
    const totalPrice = cart.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    return {
      ...cart,
      cartItems: cart.cartItems.map((item) => ({
        ...item,
        displayPrice: `₱${parseFloat(item.price).toLocaleString()}`,
      })),
      totalItems: cart.cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
      ),
      totalPrice,
      totalPriceDisplay: `₱${parseFloat(totalPrice).toLocaleString()}`,
    };
  }, [cart]);

  useEffect(() => {
    if (computedCart.status === "BACKEND_CART") {
      backendCartMutation.mutate({
        id: cartBackend.id,
        cartItems: computedCart.cartItems,
      });
    }
  }, [computedCart.status, cartBackend.id, computedCart.cartItems]);

  const getPizzaById = (pizzaId) =>
    computedCart.cartItems.find((item) => item.pizzaId === pizzaId);

  const addToCart = ({
    id,
    name,
    price,
    quantity,
    imageSrc,
    imageAlt,
    size,
  }) => {
    if (name && price && quantity) {
      const newItem = {
        pizzaId: id,
        name,
        price,
        quantity,
        total: price * quantity,
        imageSrc,
        imageAlt,
        size,
        typedQuantity: null,
      };

      setCart((cart) => ({
        ...cart,
        cartItems: [...cart.cartItems, newItem],
      }));
    }
  };

  const updateCartItem = (pizzaId, propertiesToUpdate) => {
    if (pizzaId) {
      if (propertiesToUpdate.quantity < 1) {
        removeCartItemById(pizzaId);
        return;
      }

      const updatedCartItems = cart.cartItems.map((item) => {
        if (item.pizzaId === pizzaId)
          return {
            ...item,
            ...propertiesToUpdate,
            total: propertiesToUpdate.quantity * item.price,
          };

        return item;
      });

      setCart((cart) => ({
        ...cart,
        cartItems: updatedCartItems,
      }));
    }
  };

  const updateItemTypedQuantity = (pizzaId, typedQuantity) => {
    const updatedCartItems = cart.cartItems.map((item) => {
      if (item.pizzaId === pizzaId)
        return {
          ...item,
          typedQuantity,
        };

      return item;
    });

    setCart((cart) => ({
      ...cart,
      cartItems: updatedCartItems,
    }));
  };

  const resetClientCart = () => {
    setCart(initialState);
    setLocalStorageItem("cart", initialState);
  };

  const removeAllCartItems = () => {
    setCart((cart) => ({ ...cart, cartItems: [] }));
  };

  const removeCartItemById = (pizzaId = "") => {
    setCart((cart) => {
      return {
        ...cart,
        cartItems: cart.cartItems.filter((item) => item.pizzaId !== pizzaId),
      };
    });
  };

  const showCartMenu = () => setCart((cart) => ({ ...cart, showMenu: true }));
  const closeCartMenu = () => setCart((cart) => ({ ...cart, showMenu: false }));

  useSyncLocalStorageCartToComputedCart({ computedCart, setCart });
  useSyncClientCartToBackendCart({ cartBackend, setCart });

  return (
    <CartContext.Provider
      value={{
        cart: computedCart,
        addToCart,
        updateCartItem,
        showCartMenu,
        closeCartMenu,
        resetClientCart,
        updateItemTypedQuantity,
        getPizzaById,
        removeAllCartItems,
        removeCartItemById,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
