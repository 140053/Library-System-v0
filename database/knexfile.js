// Update with your config settings.
require('dotenv').config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : '10.2.42.53',
      port : 3306,
      user : 'root',
      password : '140053ken',
      database : 'libmanV0'
    }
  },
  migrations: {
    directory: './migrations', // the directory where your migration files are stored
  },
  
};
