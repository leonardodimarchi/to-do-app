const config = {
  type: process.env.DB_TYPE,
  migrationsRun: process.env.DB_MIGRATIONS_RUN,
  acquireTimeout: process.env.DB_TIMEOUT,
  synchronize: process.env.DB_SYNCHRONIZE,
  database: process.env.DB_DATABASE,
  logging: process.env.DB_LOGGING,
  cli: {
    migrationsDir: 'src/migrations',
  },
}

module.exports = config;