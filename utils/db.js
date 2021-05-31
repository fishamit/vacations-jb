const mysql = require("mysql");
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: "Z",
});

connection.connect();

const query = str => {
  return new Promise((resolve, reject) => {
    connection.query(str, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  });
};

module.exports = query;
