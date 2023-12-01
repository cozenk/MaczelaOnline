import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getLocalStorageItem, setLocalStorageItem } from "@utils/localStorage";
import { useEffect } from "react";

export function useSyncLocalStorageCartToComputedCart({
  setCart,
  computedCart,
}) {
  // Only sync guest cart (not backend cart) to local storage
  useEffect(() => {
    if (
      computedCart.status === "LOADING" &&
      computedCart.status !== "BACKEND_CART"
    ) {
      const clientCart = getLocalStorageItem("cart");
      if (clientCart) return setCart({ ...clientCart, status: "CLIENT_CART" });

      return setCart((cart) => ({ ...cart, status: "CLIENT_CART" }));
    }

    setLocalStorageItem("cart", computedCart);
  }, [computedCart]);
}

export function useSyncClientCartToBackendCart({ cartBackend, setCart }) {
  useEffect(() => {
    if (cartBackend.status === "BACKEND_CART") {
      setCart((cart) => ({
        ...cart,
        cartItems: cartBackend.cartItems,
        status: cartBackend.status,
      }));
    }
  }, [cartBackend]);
}

export function useBackendCartMutation() {
  const queryClient = useQueryClient();

  const cartBackendMutation = useMutation({
    mutationFn: async (cart) => {
      await fetch("/api/cart/sync", {
        method: "POST",
        body: JSON.stringify({
          cartId: cart.id,
          cartItems: cart.cartItems,
        }),
      });
    },
    onError: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return cartBackendMutation;
}
