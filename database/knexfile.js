// Update with your config settings.
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : process.env.DB_HOST,
      port : 3306,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE
    }
  },
  migrations: {
    directory: './migrations', // the directory where your migration files are stored
  },
  
};
