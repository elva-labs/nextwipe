import { zValidator } from "@hono/zod-validator";
import { Games } from "@nextwipe/core/games";
import { Hono } from "hono";

const app = new Hono();

/**
 * Get game
 */
app.get("/:id", async (c) => {
  const id = c.req.param("id");

  const game = await Games.get(id);

  return c.json(game);
});

/**
 * Create game
 */
app.post("/", zValidator("json", Games.schemaWithoutId), async (c) => {
  const validated = c.req.valid("json");

  const result = await Games.create(validated);

  return c.json(result);
});

/**
 * Update game
 */
app.put("/:id", zValidator("json", Games.schema.partial()), async (c) => {
  const id = c.req.param("id");
  const validated = c.req.valid("json");

  const gameId = await Games.update(id, validated);

  return c.json(gameId);
});

/**
 * Get game
 */
app.delete("/:id", async (c) => {
  const id = c.req.param("id");

  const gameId = await Games.remove(id);

  return c.json(gameId);
});

/**
 * List games
 * I don't know how we should handle pagination
 */
app.get("/", async (c) => {
  const result = await Games.list();

  return c.json(result);
});

export default app;
