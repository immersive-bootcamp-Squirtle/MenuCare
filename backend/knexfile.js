//ローカル実行するときは以下のコメントアウトを外す
require('dotenv').config({ path: './.env.local'})

// process.env

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME,
      user:     process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
};

// AWS上へdeployするときは以下のコメントアウトを外す
// require('dotenv').config({ path: './.env.local'})

// module.exports = {

//   development: {
//     client: 'postgresql',
//     connection: {
//       host: process.env.DB_HOST,
//       database: process.env.DB_NAME,
//       user:     process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       port: 5432
//     },
//     migrations: {
//       directory: './db/migrations'
//     },
//     seeds: {
//       directory: './db/seeds'
//     }
//   }
// };