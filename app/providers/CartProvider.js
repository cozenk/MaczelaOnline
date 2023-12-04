"use client";

import { setLocalStorageItem } from "@utils/localStorage";
import { createContext, useMemo, useState } from "react";
import {
  useBackendCartMutation,
  useFetchCartBackend,
  useSyncClientCartToBackendCart,
  useSyncLocalStorageCartToComputedCart,
} from "./hooks";

export const CartContext = createContext({});

const initialState = {
  showMenu: false,
  status: "LOADING",
  cartItems: [],
  action: null,
};

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(initialState);

  const cartBackend = useFetchCartBackend({ initialState, clientCart: cart });
  const backendCartMutation = useBackendCartMutation();

  const computedCart = useMemo(() => {
    if (cartBackend.status === "BACKEND_CART") {
      backendCartMutation.mutate({
        id: cartBackend.id,
        cartItems: cart.cartItems,
      });
    }

    const totalPrice = cart.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    const filtered = cart.cartItems.filter((item) => {
      if (item.quantity >= 1) {
        return item;
      }
      return null;
    });

    return {
      ...cart,
      cartItems: filtered.map((item) => ({
        ...item,
        displayPrice: `₱${item.price}`,
      })),
      totalItems: filtered.reduce((total, item) => total + item.quantity, 0),
      totalPrice,
      totalPriceDisplay: `₱${totalPrice}`,
    };
  }, [cart, cartBackend]);

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
      };

      setCart((cart) => ({
        ...cart,
        cartItems: [...cart.cartItems, newItem],
      }));
    }
  };

  const updateCartItem = (pizzaId, propertiesToUpdate) => {
    if (pizzaId) {
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

  const resetClientCart = () => {
    setCart(initialState);
    setLocalStorageItem("cart", initialState);
  };

  const showCartMenu = () => setCart((cart) => ({ ...cart, showMenu: true }));
  const closeCartMenu = () => setCart((cart) => ({ ...cart, showMenu: false }));

  useSyncLocalStorageCartToComputedCart({ computedCart, setCart });
  useSyncClientCartToBackendCart({ cartBackend, resetClientCart, setCart });

  return (
    <CartContext.Provider
      value={{
        cart: computedCart,
        addToCart,
        updateCartItem,
        showCartMenu,
        closeCartMenu,
        resetClientCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
