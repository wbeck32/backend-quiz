const app = require('./lib/app');
const http = require('http');
require('dotenv').config()
const dbUri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const connect = require('./lib/connect');
const server = http.createServer(app);

connect(dbUri);

server.listen(port, () => {
  console.log('server running on', server.address().port);
});