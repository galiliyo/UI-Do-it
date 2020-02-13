// hello.js
module.exports = (req, res, next) => {
  console.log('MW RUNNNIG', req);
  const data = req.body;

  if (req.url.indexOf('/login') !== -1) {
    res.send(
      {
        'status': 'ok',
        'userId': 'Nma0UserId023',
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI'
      });
  } else {
    next();
  }
};
