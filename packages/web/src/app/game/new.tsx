import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useCreateGame } from "../../hooks/games";

export default function GameCreatePage() {
  const navigate = useNavigate();
  const {
    mutateAsync: createGame,
    isPending: isLoading,
    error,
  } = useCreateGame();

  const [formData, setFormData] = useState({
    title: "",
    event: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: formData.endDate
        ? new Date(formData.endDate).toISOString()
        : undefined,
    };

    try {
      const game = await createGame(formattedData);

      navigate(`/game/${game.id}`);
    } catch (err) {
      console.error("Failed to create game:", err);
    }
  };

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Create New Game</h1>

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
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Game"}
          </Button>
        </div>
      </form>
    </>
  );
}
