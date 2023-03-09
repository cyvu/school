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

  describe(table) {
    this.connection.query(`DESCRIBE ${table}`, (err, rows, fields) => {
      process.stdout.write("".concat(
        "\nDatabase.\x1B[3;32m", 
        "describe",
        "\x1B[0;22m (", table, "):\n",
        JSON.stringify( rows, null, 2))
      )
    })
  }

  /* TODO: clean on prod */
  read(table, field) {
    this.connection.query(`SELECT ${field} FROM ${table}`, function (err, rows, fields) {
      if (err) throw err
      if (rows) {
        process.stdout.write("".concat("\nDatabase.\x1B[3;34m", "read", "\x1B[0;22m (", field, "):\n", JSON.stringify( rows, null, 2)))
      }
    })
  }

  /* TODO: clean on prod */
  write(table, values) {
    this.connection.query(`INSERT INTO ${table} VALUES (${values})`, function (err, rows, fields) {
      if (err) throw err
      if (rows) {
        if (rows.affectedRows === 1)
          process.stdout.write("".concat("\nDatabase.\x1B[3;35m", "write", "\x1B[0;2m (", "\"", values, "\") into \x1B[7;24m ", table, " \x1B[27m" ))
      }
    })
  }
  
  /* TODO: clean on prod */
  delete(table, field, value){
    this.connection.query(`DELETE FROM ${table} WHERE ${field}= "${value}"`, function (err, rows, fields) {
      if (err) throw err
      if (rows) {
          if (rows.affectedRows === 1)
          process.stdout.write("".concat("\nDatabase.\x1B[3;31m" , "delete", "\x1B[0;2m (", field, "): \x1B[0;31m\"\x1B[9;31m", value, "\x1B[0;2m\x1B[0;31m\"\x1B[0;2m"))
      }
    }) 
  }

  update(table, field, fieldvalue, cityfield, value){
    this.connection.query(`UPDATE ${table} SET ${field} = "${fieldvalue}"  WHERE ${cityfield}= "${value}"`, function (err, rows, fields) {
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
db.update ('persons',`City`, 'SmutsSmuts', `LastName`, `Bengan` )
db.read('persons', '*')
//db.describe('persons')
db.closeConnection()