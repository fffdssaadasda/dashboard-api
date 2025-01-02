import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useDeleteProject(queryK, mutationFn) {
  const queryClient = useQueryClient();
  const {
    data,
    isError,
    error,
    mutate: deleteProject,
  } = useMutation({
    mutationKey: queryK,
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries(queryK),
  });
  return {
    data,
    isError,
    error,
    deleteProject,
  };
}
