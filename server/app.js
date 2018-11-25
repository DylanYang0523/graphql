const express = require('express');
const graphqlHttp = require('express-graphql');
const schema = require('./schema/schema');
const app = express();

<<<<<<< HEAD
const gqSchema = {
  schema,
  graphiql: true,
};

app.use('/graphql', graphqlHttp(gqSchema));
=======
app.use('/graphql', graphqlHttp({
  schema
}));
>>>>>>> 7e8cdad2b0570082a292cff33dd4f2cb5a312d5c

app.listen(4000, () => {
  console.log('listening for requests on prot 4000...');
});
