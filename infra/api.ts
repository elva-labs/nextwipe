import { table } from "./storage";

export const api = new sst.aws.Function("Api", {
  url: true,
  link: [table],
  handler: "packages/functions/src/api.handler",
});
