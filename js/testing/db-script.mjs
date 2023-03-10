//import { mysql_user, mysql_pass, mysql_db } from '/env/credentials.js';
import { Database } from "../classes/database.mjs"
import * as fs from "node:fs"







const db = new Database()

db.read("Persons", "LastName")
db.closeConnection()