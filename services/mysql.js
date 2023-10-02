const mysql2 = require('mysql2');

const pool = mysql2.createPool({
	connectionLimit: 10,
	host: process.env.DB_IP,
	user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

module.exports = {
	pool: pool,
};