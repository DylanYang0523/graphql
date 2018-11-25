const express = require('express');
const graphqlHttp = require('express-graphql');
const schema = require('./schema/schema');
const app = express();

const gqSchema = {
  schema,
  graphiql: true,
};

app.use('/graphql', graphqlHttp(gqSchema));

app.listen(4000, () => {
  console.log('listening for requests on prot 4000...');
});
