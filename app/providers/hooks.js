import { useCurrentUser } from "@shared/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    } else {
      setLocalStorageItem("cart", computedCart);
    }
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
  });

  return cartBackendMutation;
}

export function useFetchCartBackend({ initialState, clientCart }) {
  const { user, isLoading } = useCurrentUser();

  const { data: cartBackend } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const fetchedCart = await (await fetch("/api/cart/me")).json();
      if (fetchedCart) {
        return {
          ...clientCart,
          id: fetchedCart.id,
          cartItems: fetchedCart.cartItems,
          status: "BACKEND_CART",
        };
      }

      return { ...clientCart, status: "NOT_LOGGED_IN" };
    },
    initialData: initialState,
    enabled: !!user && !isLoading,
  });

  return cartBackend;
}
