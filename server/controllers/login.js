const { join } = require('path');
const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { getUser } = require('../database/queries/getUser');

exports.renderLogin = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'login.html'));
};
exports.post = (req, res, next) => {
  const { email, password } = req.body;
  getUser(email)
    .then(result => result.rows[0])
    .then(foundUser => compare(password, foundUser.password))
    .then(correctPass => {
      if (correctPass)
        sign(JSON.stringify({ isLogged: true }), process.env.SECRETTU, (err, result) => {
          if (err) throw err;
          res.cookie('token', result);
          res.redirect('/');
        });
      else res.send('incorrect password');
    });
};
