//import { mysql_user, mysql_pass, mysql_db } from '/env/credentials.js';

let mysql = require('mysql')

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'school'
});

if (connection.connect()) {
  console.log('sql works!')
}

connection.query('SHOW TABLES', function (err, rows, fields) {
  if (err) throw err;

  console.log(rows);
});


connection.end()