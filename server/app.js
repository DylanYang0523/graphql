const express = require('express');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const mLabConfig = require('../mLab.config');
const schema = require('./schema/schema');
const app = express();

const username = mLabConfig.username;
const password = mLabConfig.password;
const address = mLabConfig.address;
const port = mLabConfig.port;
const db = mLabConfig.db;
mongoose.connect(`mongodb://${username}:${password}@${address}:${port}/${db}`);
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
