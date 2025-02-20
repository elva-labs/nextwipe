import { Games } from "@nextwipe/core/games";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditGame = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Games.GameWithoutId) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}game/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      queryClient.invalidateQueries({ queryKey: ["game", id] });
    },
  });
};
