const express = require('express');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const mLabConfig = require('../mLab.config');
const schema = require('./schema/schema');
const app = express();

const username = mLabConfig.username;
const password = mLabConfig.password;
mongoose.connect(`mongodb://${username}:${password}@ds111895.mlab.com:11895/github-graphql`);
mongoose.connection.once('open', () => {
  console.log('connected to database');
});

const gqSchema = {
  schema,
  graphiql: true,
};

app.use('/graphql', graphqlHttp(gqSchema));

app.listen(4000, () => {
  console.log('listening for requests on prot 4000...');
});
