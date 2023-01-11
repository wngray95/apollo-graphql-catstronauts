"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const resolvers_1 = require("./resolvers");
const schema_1 = require("./schema");
const track_api_1 = require("./datasources/track-api");
async function App() {
    const server = new server_1.ApolloServer({
        typeDefs: schema_1.typeDefs,
        resolvers: resolvers_1.resolvers,
    });
    const port = parseInt(process.env.PORT) || 4000;
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        context: async ({ req }) => {
            return {
                dataSources: {
                    trackAPI: new track_api_1.TrackAPI(),
                },
                token: req.headers.token,
            };
        },
        listen: { port },
    });
    console.log(`🚀  Server ready at ${url}`);
}
App();
