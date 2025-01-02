import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCreateProject(queryK, mutationFn) {
  const queryClient = useQueryClient();
  const {
    data,
    isError,
    error,
    isPending,
    mutate: createProject,
  } = useMutation({
    mutationKey: queryK,
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries(queryK),
  });
  return {
    data,
    isError,
    error,
    createProject,
    isPending,
  };
}
