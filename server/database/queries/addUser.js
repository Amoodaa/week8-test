const connection = require('../config/connection');
// Write a query to add the user and their password to the database
exports.addUser = ({ email, password }) => {
  const sql = {
    text: 'INSERT INTO test_user (email,password) VALUES ($1,$2);',
    values: [email, password]
  };
  return connection.query(sql);
};
