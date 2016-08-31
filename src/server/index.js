// @flow

const PORT = 8080;

const server = process.env.NODE_ENV === 'development'
  ? require('./server.dev')
  : require('./server.prod');

server.listen(PORT, '127.0.0.1', err => {
  if (err) {
    console.error(err);
    return;
  }
  console.info('==> 🚧  Server listening on port %s', PORT);
});
