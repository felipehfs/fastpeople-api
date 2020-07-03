const { ApolloServer } = require('apollo-server');
const { join } = require('path');
const { loadSchemaSync } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { addResolversToSchema } = require('@graphql-tools/schema');
const jwt = require('jsonwebtoken');
const knex = require('./config/db');

const resolvers = require('./resolvers');

const schema = loadSchemaSync(join(__dirname, 'schema', 'index.graphql'), {
    loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers
});

const server = new ApolloServer({
    schema: schemaWithResolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization: null;
        if (auth && auth.toLowerCase().startsWith('bearer')) {
            const decodedToken =  jwt.verify(auth.substring(7), 'secret');
            
            const currentUser = await knex('users')
                .select("*")
                .where({
                    id: decodedToken.id,
                }).first();

            return { currentUser };
        } 
    }
});

server.listen()
    .then(({ url }) => console.log(`Running on ${url}`));