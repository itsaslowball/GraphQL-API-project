// Install express-graphql and graphql-tools if not already installed
// npm install express-graphql graphql graphql-tools

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");


const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, 
  })
);

// Start the server at port 4000
app.listen(4000, () => {
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
});
