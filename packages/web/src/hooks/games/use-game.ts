import { Games } from "@nextwipe/core/games";
import { useQuery } from "@tanstack/react-query";

export const useGame = (gameId: string) => {
  return useQuery({
    queryKey: ["game", gameId],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}game/${gameId}`);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return (await res.json()) as Games.Game;
    },
    enabled: !!gameId,
  });
};
