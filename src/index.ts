import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { readFileSync } from 'fs';
import path from 'path';
import { gql } from 'graphql-tag';

import { resolvers } from './resolvers';
import { TrackAPI } from './datasources/track-api';

async function startServer() {
    const typeDefs = gql(readFileSync(path.resolve(__dirname, './schema.graphql'), {
        encoding: 'utf-8',
    }));

    const server = new ApolloServer({
        schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
    });

    const port = parseInt(process.env.PORT!) || 4000;
    
    const { url } = await startStandaloneServer(server, {
        context: async ({ req }) => {
            return {
                dataSources: {
                    trackAPI: new TrackAPI(),
                },
                token: req.headers.token,
            };
        },
        listen: { port },
    });
    console.log(`🚀  Server ready at ${url}`);
}
startServer();
