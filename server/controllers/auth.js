const { verify } = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  console.log(req.cookies.token);
  verify(req.cookies.token, process.env.SECRETTU, (err, result) => {
    if (err) throw err;
    const { isLogged } = result;
    if (isLogged) {
      req.user = { isLogged };
      next();
    } else res.redirect('/');
  });
};
