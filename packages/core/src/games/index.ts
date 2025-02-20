import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { Resource } from "sst";
import { z } from "zod";
import { ddb } from "../util/ddb";

export namespace Games {
  export const schema = z.object({
    id: z.string(),
    title: z.string(),
    event: z.string(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime().optional(),
  });
  export const schemaWithoutId = schema.omit({ id: true });
  export const ddbSchema = schema.extend({
    pk: z.string(),
    sk: z.string(),
  });

  export type Game = z.infer<typeof schema>;
  export type GameWithoutId = z.infer<typeof schemaWithoutId>;

  export const create = async (game: GameWithoutId) => {
    const id = crypto.randomUUID();

    try {
      const ddbItem = ddbSchema.parse({
        ...game,
        id,
        pk: "GAME",
        sk: id,
      });

      const command = new PutCommand({
        TableName: Resource.Table.name,
        Item: ddbItem,
      });

      await ddb.send(command);

      return { ...game, id };
    } catch (error) {
      console.error("Error creating game", error);
      throw error;
    }
  };

  export const get = async (gameId: string) => {
    const command = new GetCommand({
      TableName: Resource.Table.name,
      Key: { pk: "GAME", sk: gameId },
    });

    const result = await ddb.send(command);

    return result.Item;
  };

  // no pagination in mind currently
  export const list = async () => {
    const command = new QueryCommand({
      TableName: Resource.Table.name,
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": "GAME",
      },
    });

    const result = await ddb.send(command);

    return result.Items;
  };

  export const update = async (
    gameId: string,
    game: Partial<GameWithoutId>,
  ) => {
    const command = new UpdateCommand({
      TableName: Resource.Table.name,
      Key: { pk: "GAME", sk: gameId },
      UpdateExpression:
        "set #title = :title, #event = :event, #startDate = :startDate, #endDate = :endDate",
      ExpressionAttributeValues: {
        ":title": game.title,
        ":event": game.event,
        ":startDate": game.startDate,
        ":endDate": game.endDate,
      },
    });

    await ddb.send(command);

    return gameId;
  };

  export const remove = async (gameId: string) => {
    const command = new DeleteCommand({
      TableName: Resource.Table.name,
      Key: { pk: "GAME", sk: gameId },
    });

    await ddb.send(command);

    return gameId;
  };
}
