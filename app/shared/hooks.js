import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
