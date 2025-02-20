import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { logger } from "hono/logger";
import gameRoute from "./api/game";

const app = new Hono().use(logger());

const routes = app
  // .route("/game", gameRoute) just add routes like this
  // .route("/game", gameRoute)
  .route("/game", gameRoute);

export type AppType = typeof routes;

export const handler = handle(app);
