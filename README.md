# NextWipe

NextWipe is a platform to identify and list upcoming seasons and wipes for games.

## Usage

### Let's get cracking

Shit's easy to run. Just do `bun sst dev`. That's it.

The AWS account used for this is `elva-örebro-dev`.

Versioning:

- Node.js 22
- Bun 1.2 (or higher)

1. `core/`

   This is for any shared code. It's defined as modules.

   ```ts
   export module Games {
     export function get(gameId: string) {
       // logic to get the game
       return game;
     }
   }
   ```

   That you can use across other packages using.

   ```ts
   import { Games } from "@nextwipe/core/games";

   Example.hello();
   ```

   We also have [Vitest](https://vitest.dev/) configured for testing this package with the `sst shell` CLI.

   ```bash
   npm test
   ```

2. `functions/`

   This is for your Lambda functions and it uses the `core` package as a local dependency.

3. `scripts/`

   This is for any scripts that you can run on your SST app using the `sst shell` CLI and [`tsx`](https://www.npmjs.com/package/tsx). For example, you can run the example script using:

   ```bash
   npm run shell src/example.ts
   ```

4. `web/`

   This is the React Router application which will be user facing.

### Infrastructure

The `infra/` directory allows you to logically split the infrastructure of your app into separate files. This can be helpful as your app grows.

In the template, we have an `api.ts`, and `storage.ts`. These export the created resources. And are imported in the `sst.config.ts`.

More information regarding the Monorepo can be found [here](https://sst.dev/docs/set-up-a-monorepo).
