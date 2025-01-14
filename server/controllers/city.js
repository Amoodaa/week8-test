const { join } = require('path');

const { getCities } = require('../database/queries/getCities');
const { addCity } = require('../database/queries/addCity');

exports.renderCities = (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'public', 'cities.html'));
};

exports.getAllCities = (req, res, next) => {
  if (req.user.isLogged)
    getCities()
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => next(err));
  else res.status(401).send('plz login first');
};

exports.add = (req, res, next) => {
  const cityInfo = req.body;
  if (req.user.isLogged)
    addCity(cityInfo)
      .then(() => res.redirect('/cities'))
      .catch(err => next(err));
  else res.status(401).send('plz login first');
};
