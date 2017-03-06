const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.get('/hello', (req, res) => {
  res.send('world');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const server = app.listen(4000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Listening ${host}:${port}`);
});
