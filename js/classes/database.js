//import { mysql_user, mysql_pass, mysql_db } from '/env/credentials.js';
let mysql = require('mysql')

class Database
{
  constructor() {
      this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'school',
    })
  }

  isConnected() {
    return this.connection.connect((err) => {
      if (err) {
        console.error('error during disconnection', err.stack)
        return reject(err)
      }
    })
  }

  closeConnection() {
    return this.connection.end((err) => {
      if (err) {
        console.error('error during disconnection', err.stack)
        return reject(err)
      }
    })
  }

  read(table, field) {
    this.connection.query(`SELECT ${field} FROM ${table}`, function (err, rows, fields) {
      if (err) throw err
      if (rows) {
        process.stdout.write(JSON.stringify( rows ))
      }
    })
  }

  write(table, values) {
    this.connection.query(`INSERT INTO ${table} VALUES (${values})`, function (err, rows, fields) {
      if (err) throw err
      if (rows) {
        process.stdout.write(JSON.stringify( rows ))
      }
    })
  }
  
  delete(table, field, value){
    this.connection.query(`DELETE FROM ${table} WHERE ${field}= "${value}"`, function (err, rows, fields) {
      if (err) throw err
      if (rows) {
        process.stdout.write(JSON.stringify( rows ))
      }
    }) 
  }
}

const db = new Database()
db.isConnected()
db.write('persons', `2, "Spring", "Blixted", "Some gata 1", "Höteborg"`)
db.read('persons', 'LastName')
db.delete('persons', 'LastName', 'Spring')
db.read('persons', 'LastName')
db.closeConnection()