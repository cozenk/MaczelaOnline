import { CartContext } from "@providers/CartProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

export function useGetAllUsers() {
  const fetchAllUser = async () => {
    return (await fetch("/api/users")).json();
  };

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUser,
    retry: 3,
  });

  return { users, isLoading, error };
}

export function useCurrentUser() {
  const fetchCurrentUser = async () => {
    return (await fetch("/api/users/me", { cache: "reload" })).json();
  };

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["current-user"],
    queryFn: fetchCurrentUser,
    retry: false,
  });

  return { user, isLoading, error };
}

export function useGetUserById(userId = null) {
  const fetchUserById = async () => {
    return (await fetch(`/api/users/${userId}`)).json();
  };

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: fetchUserById,
    retry: 3,
  });

  return { user, isLoading, error };
}

export function useCurrentUserOrById(userId = null) {
  if (userId) {
    const { user: userById, isLoading: userByIdLoading } =
      useGetUserById(userId);
    user = userById;
    isLoading = userByIdLoading;

    return {
      use: userById,
      isLoading: userByIdLoading,
    };
  } else {
    const { user: currentUser, isLoading: currentUserLoading } =
      useCurrentUser();

    return {
      user: currentUser,
      isLoading: currentUserLoading,
    };
  }
}

export function useUserInfoMutation(userId = null) {
  const queryClient = useQueryClient();

  const currentUserInfoMutation = useMutation({
    mutationFn: async (formData) => {
      await fetch("/api/users/me", { method: "PATCH", body: formData });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const userByIdInfoMutation = useMutation({
    mutationFn: async (formData) => {
      await fetch(`/api/users/${userId}`, { method: "PATCH", body: formData });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", userId],
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return userId ? userByIdInfoMutation : currentUserInfoMutation;
}

export function useAddOrUpdate({
  pizza = null,
  selectedVariant = null,
  quantity = 1,
}) {
  const { getPizzaById, addToCart, updateCartItem, showCartMenu } =
    useContext(CartContext);

  return () => {
    const existingPizza = getPizzaById(
      selectedVariant.name
        ? `${pizza.id}-${selectedVariant.name}`
        : `${pizza.id}-${pizza.size}`,
    );

    if (existingPizza) {
      if (selectedVariant.name && selectedVariant.name !== existingPizza.size) {
        addToCart({
          id: `${pizza.id}-${selectedVariant.name}`,
          name: pizza.name,
          price: selectedVariant.price,
          quantity: quantity,
          imageSrc: pizza.imageSrc,
          imageAlt: pizza.imageAlt,
          size: selectedVariant.name,
        });
      } else
        updateCartItem(existingPizza.pizzaId, {
          price: selectedVariant.price || pizza.price,
          quantity: existingPizza.quantity + quantity,
          size: selectedVariant.name || pizza.size,
        });
    } else {
      addToCart({
        id: selectedVariant.name
          ? `${pizza.id}-${selectedVariant.name}`
          : `${pizza.id}-${pizza.size}`,
        name: pizza.name,
        price: selectedVariant.price || pizza.price,
        quantity: quantity,
        imageSrc: pizza.imageSrc,
        imageAlt: pizza.imageAlt,
        size: selectedVariant.name || pizza.size,
      });
    }

    showCartMenu();
  };
}
