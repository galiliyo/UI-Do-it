const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(' db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use((req, res, next) => {
  if (req.url.indexOf('/login') !== -1) {
    if (isAuthorized(req)) { // add your authorization logic here
      res.send(
        {
          'status': 'ok',
          "userId": "Nma0UserId023",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI"
        });

      // continue to JSON Server router
    } else {
      res.sendStatus(401);
    }
  } else {
    next();
  }
});
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});

isAuthorized = (req) => {
  console.log('auth check', req);
  return (req.email === '1' && req.password === '1')
};
