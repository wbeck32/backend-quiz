const app = require('./lib/app');
const http = require('http');
require('dotenv').config()
const dbUri = process.env.MONGO_URI;
const connect = require('./lib/connect');

connect(dbUri);

const server = http.createServer(app);
const port = 3000;
server.listen(port, () => {
  console.log('server running on', server.address().port);
});

