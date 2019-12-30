const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'WildCode44!',
  database: 'giveMeWater',
});

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connect MYSQL');
  }
});

module.exports = connection;
