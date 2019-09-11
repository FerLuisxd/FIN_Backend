import * as sqlite3 from 'sqlite3';
const DB = require('better-sqlite3-helper');

DB({
  path: './db/data/sqlite3.db', // this is the default
  memory: false, // create a db only in memory
  readonly: false, // read only
  fileMustExist: false, // throw error if database not exists
  WAL: true, // automatically enable 'PRAGMA journal_mode = WAL'
  migrate: {
    // disable completely by setting `migrate: false`
    force: false, // set to 'last' to automatically reapply the last migration-file
    table: 'migration', // name of the database table that is used to keep track
    migrationsPath: './db/migrations', // path of the migration-files
  },
});

// DB().insert('user', {
//     username: 'dsafasdsa',
//     password:'1234',
//     email: 'me@cristiamdiaz.com',
//     role: 'admin'
//   })

let allUsers = DB().query('SELECT * FROM user');
console.log('users', allUsers);
let sqlite = new sqlite3.Database('./users.db');

let sql_user =
  'CREATE TABLE IF NOT EXISTS user (' +
  'id VARCHAR PRIMARY KEY,' +
  'username VARCHAR NOT NULL,' +
  'email VARCHAR NOT NULL,' +
  'password VARCHAR NOT NULL,' +
  'role VARCHAR NOT NULL' +
  ')';

let sql_populate =
  'INSERT OR IGNORE INTO user(id, username, email, password, role)' +
  'VALUES ("eb8814013b6c11e7b1a46b0d99a2ac51", "cdiaz", "me@cristiamdiaz.com", "1234", "contributor"),' +
  '("616e44a03b6d11e7ba930b5b44d9808b", "KamilMysliwiec", "mail@kamilmysliwiec.com", "12345", "admin"),' +
  '("6f13eba03b6d11e780d5c59d28f4b039", "juandav", "ejuandav@gmail.com", "1234", "user")';

sqlite.serialize(function() {
  sqlite.run(sql_user);
  sqlite.run(sql_populate);
});
console.log('started db');

export const db = sqlite;
