const connection = require('../database/conf');

const getPlant = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM plant WHERE id = ${id}`, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result[0]);
    });
  });
}

module.exports = getPlant;
