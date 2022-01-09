import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { TournamentResolver } from "./resolvers/tournament";
import { MatchResolver } from "./resolvers/match";
import { RoundResolver } from "./resolvers/round";
import { PlayerResolver } from "./resolvers/player";
import { BalanceResolver } from "./resolvers/balance";
//import { TestResolver } from "./test/test";

export async function startServer() {

    const app = express();

    const apolloServer = new ApolloServer({
        //schema
        schema: await buildSchema({
            resolvers: [
                TournamentResolver,
                MatchResolver,
                RoundResolver,
                PlayerResolver,
                BalanceResolver,
                //TestResolver
            ],
            validate: false
        }),
        context: ({ req, res }) => ({ req, res })
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app, path: "/graphql" })

    return app;
}