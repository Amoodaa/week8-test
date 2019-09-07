const dbConnection = require('../config/connection');

exports.getCities = () => {
  return dbConnection.query(`SELECT * FROM city;`);
};
