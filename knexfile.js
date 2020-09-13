// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: 'pipe-gamer-db',
      user: 'root',
      password: 'toor',
      database: 'gamedb'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations',
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  }
};
