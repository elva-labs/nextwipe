import { Games } from "@nextwipe/core/games";
import { useQuery } from "@tanstack/react-query";

export const useGames = () => {
  return useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}game`);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return (await res.json()) as Games.Game[];
    },
  });
};
