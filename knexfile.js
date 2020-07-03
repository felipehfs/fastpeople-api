// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: "randomTalk",
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
    }, 
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

};
