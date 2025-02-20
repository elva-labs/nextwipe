import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (gameId: string) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}game/${gameId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });
};
