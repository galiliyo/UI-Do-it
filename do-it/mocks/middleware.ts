// const EntitiesMetadata = require('./EntitiesMetadata.ts');

module.exports = (req, res, next) => {
  const delay = 500;
  res.setHeader('Content-Type', 'application/text');
  setTimeout(() => {
    if (req.url.includes('/login')) {
      login(req, res);
    } else if (req.url.includes('/todos')) {
      next();
    }
  }, delay);


  const login = (req, res) => {
    console.log('data', req.body);
    const data = req.body;

    if (data.email === '1' && data.password === '1') {

      res.send(
        {
          'status': 'ok',
          'userId': 'Nma0UserId023',
          'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI'
        });
    } else {
      res.send({'status': 'fail'});
    }
  };
};
