const mysql = require('mysql');
const connection = mysql.createConnection({
	host: "sql12.freesqldatabase.com",
	user: 'sql12645912',
	password:  'fSBIaQ4AZF',
	database:  'sql12645912',
});
module.exports = connection;