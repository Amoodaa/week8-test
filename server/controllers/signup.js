const { join } = require('path');
const { hash } = require('bcrypt');
const { addUser } = require('../database/queries/addUser');
const { getUser } = require('../database/queries/getUser');

exports.renderSignup = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'signup.html'));
};
exports.post = (req, res, next) => {
  const { email, password } = req.body;
  getUser(email)
    .then(result => result.rows.length === 0)
    .then(isAvailable => {
      if (isAvailable) return hash(password, 10);
      throw Error('email exists');
    })
    .then(hashed => addUser({ email, password: hashed }))
    .then(() => res.redirect('/'))
    .catch(err => {
      if (err.message === 'username exists') return res.send(err.message);
      return next(err);
    });
};
