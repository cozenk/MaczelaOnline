import { useQuery } from "@tanstack/react-query";

export function useCurrentUser() {
  const fetchCurrentUser = async () => {
    return (await fetch("/api/users/me")).json();
  };

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchCurrentUser,
  });

  return { user, isLoading, error };
}
