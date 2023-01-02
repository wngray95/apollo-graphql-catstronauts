import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js'
import { TrackAPI } from './datasources/track-api.js';

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
        return {
            dataSources: {
                trackAPI: new TrackAPI()
            },
            token: req.headers.token
        }
    },
    listen: { port: process.env.PORT || 4000 }
});
console.log(`🚀  Server ready at ${url}`);
