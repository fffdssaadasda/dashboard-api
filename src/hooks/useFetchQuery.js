import { useQuery } from "@tanstack/react-query";

export function useFetchQuery(queryK, queryFn) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: queryK,
    queryFn,
  });
  return {
    data,
    isLoading,
    isError,
    error,
  };
}
