import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useEditGame, useGame } from "../../hooks/games";

export default function GameEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    return <Navigate to="/" />;
  }

  const { data: game, isLoading: isLoadingGame } = useGame(id);
  const {
    mutateAsync: editGame,
    isPending: isUpdating,
    error,
  } = useEditGame(id);

  const [formData, setFormData] = useState({
    title: "",
    event: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (game) {
      setFormData({
        title: game.title,
        event: game.event,
        startDate: game.startDate,
        endDate: game.endDate || "",
      });
    }
  }, [game]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await editGame({
        ...formData,
        endDate: formData.endDate || undefined,
      });

      toast.success("Game updated successfully");
      navigate(`/game/${id}`);
    } catch (err) {
      console.error("Failed to update game:", err);
    }
  };

  if (isLoadingGame) {
    return <div>Loading...</div>;
  }

  if (!game) {
    return (
      <div>
        <h2>Game Not Found</h2>
        <p>The requested game could not be found.</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Edit Game</h1>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <p>{error.message}</p>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="event">Event</Label>
          <Input
            type="text"
            id="event"
            name="event"
            required
            value={formData.event}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            type="date"
            id="startDate"
            name="startDate"
            required
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => navigate("/")}>
            Back
          </Button>
          <Button type="submit" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Game"}
          </Button>
        </div>
      </form>
    </>
  );
}
