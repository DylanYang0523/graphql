const express = require('express');
const graphqlHttp = require('express-graphql');
const app = express();

const gqSchema = {

};

app.use('/graphql', graphqlHttp(gqSchema));

app.listen(4000, () => {
  console.log('listening for requests on prot 4000...');
});
