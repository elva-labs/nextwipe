import { Button } from "@/components/ui/button";
import { Link, Navigate, useParams } from "react-router";
import { useGame } from "../../hooks/games";

function GameSkeleton() {
  return (
    <div className="animate-pulse opacity-10">
      <div className="h-10 w-72 bg-gray-200 rounded mb-6" />

      <div className="space-y-6">
        <div>
          <div className="h-8 w-36 bg-gray-200 rounded mb-2" />
          <div className="h-5 w-56 bg-gray-200 rounded" />
        </div>

        <div>
          <div className="h-8 w-36 bg-gray-200 rounded mb-2" />
          <div className="h-5 w-56 bg-gray-200 rounded" />
          <div className="h-5 w-56 bg-gray-200 rounded mt-2" />
        </div>
      </div>

      <div className="mt-6 space-x-4">
        <div className="inline-block h-10 w-24 bg-gray-200 rounded" />
        <div className="inline-block h-10 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="p-6">
      <div className="bg-red-50 border border-red-200 rounded p-6">
        <h2 className="text-red-800 font-semibold text-xl mb-4">
          Error Loading Game
        </h2>
        <p className="text-red-600 text-base">{message}</p>
      </div>
    </div>
  );
}

function NotFoundMessage() {
  return (
    <div className="p-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded p-6">
        <h2 className="text-yellow-800 font-semibold text-xl mb-4">
          Game Not Found
        </h2>
        <p className="text-yellow-600 text-base">
          The requested game could not be found.
        </p>
      </div>
    </div>
  );
}

function GameDetails({ game }: { game: any }) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">{game.title}</h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Event</h2>
          <p className="text-base">{game.event}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Duration</h2>
          <p className="text-base">
            Start: {new Date(game.startDate).toLocaleDateString()}
            {game.endDate && (
              <>
                <br />
                End: {new Date(game.endDate).toLocaleDateString()}
              </>
            )}
          </p>
        </div>
      </div>

      <div className="mt-6 space-x-4">
        <Link to="/">
          <Button variant="outline" className="px-4 py-2">
            Back
          </Button>
        </Link>
        <Link to={`/game/${game.id}/edit`}>
          <Button variant="outline" className="px-4 py-2">
            Edit
          </Button>
        </Link>
      </div>
    </>
  );
}

export default function GamePage() {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/" />;
  }

  const { data: game, isLoading, error } = useGame(id);

  if (isLoading) {
    return <GameSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!game) {
    return <NotFoundMessage />;
  }

  return <GameDetails game={game} />;
}
