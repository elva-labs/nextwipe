import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteGame, useGames } from "@/hooks/games";
import { Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";

export default function HomePage() {
  const { data: games } = useGames();
  const { mutate: deleteGame } = useDeleteGame();
  const [open, setOpen] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!selectedGameId) return;

    try {
      deleteGame(selectedGameId);
      toast.success("Game deleted successfully");
    } catch (error) {
      console.error("Failed to delete game:", error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1>Games</h1>
        <Link to="/game/new">
          <Button variant="default" size="default">
            Create New Game
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Event</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {games?.map((game) => (
            <TableRow key={game.title}>
              <TableCell>{game.title}</TableCell>
              <TableCell>{game.event}</TableCell>
              <TableCell>{game.startDate}</TableCell>
              <TableCell>{game.endDate}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Link to={`/game/${game.id}`}>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      setSelectedGameId(game.id);
                      setOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this game? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
