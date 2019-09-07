const dbConnection = require('../config/connection');

exports.addCity = userData => {
  const { name, country } = userData;
  const sql = {
    text: 'INSERT INTO city (name, country) VALUES ($1, $2);',
    values: [name, country]
  };
  return dbConnection.query(sql);
};
