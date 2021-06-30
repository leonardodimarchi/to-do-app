const envalid = require('envalid');
const { join } = require('path');

const rule = {
  DATABASE_URL: envalid.str({ default: '' }),
  DB_TYPE: envalid.str({ default: '' }),
  DB_DATABASE: envalid.str({ default: '' }),
  DB_HOST: envalid.str({ default: '' }),
  DB_PASSWORD: envalid.str({ default: '' }),
  DB_PORT: envalid.port({ default: 3306 }),
  DB_USER: envalid.str({ default: '' }),
  DB_SYNCHRONIZE: envalid.bool({ default: false }),
  DB_MIGRATIONS_RUN: envalid.bool({ default: true }),
  DB_LOGGING: envalid.bool({ default: true }),
  DB_SSL: envalid.bool({ default: true }),
  DB_TIMEOUT: envalid.num({ default: 20000 }),
};

const envFieldName = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
const processEnvObject = process.env.NODE_ENV === 'test' ? { } : process.env;
const env = envalid.cleanEnv(processEnvObject, rule, { dotEnvPath: envFieldName, strict: true });

const config = {
  name: 'default',
  type: env.DB_TYPE,
  database: env.DB_DATABASE,
  logging: env.DB_LOGGING,
  logger: 'advanced-console',
  migrationsRun: env.DB_MIGRATIONS_RUN,
  acquireTimeout: env.DB_TIMEOUT,
  synchronize: env.DB_SYNCHRONIZE,
  entities: [],
  migrations: [],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

if (env.isTest) {
  config.entities.push(join(__dirname, 'src', '**', '*.entity.ts'));
  config.migrations.push(join(__dirname, 'src/migrations', '**', '*.ts'));
} else {
  config.entities.push(join(__dirname, 'dist', '**', '*.entity.js'));
  config.migrations.push(join(__dirname, 'dist/migrations', '**', '*.js'));
}

if (config.type === 'mysql') {
  Object.assign(config, {
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
    // https://stackoverflow.com/questions/35553432/error-handshake-inactivity-timeout-in-node-js-mysql-module
    keepConnectionAlive: true,
    url: env.DATABASE_URL,
    port: env.DB_PORT,
    host: env.DB_HOST,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    acquireTimeout: env.DB_TIMEOUT,
  });
} else if (env.DB_TYPE === 'postgres') {
  Object.assign(config, {
    type: 'postgres',
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
    // https://stackoverflow.com/questions/35553432/error-handshake-inactivity-timeout-in-node-js-mysql-module
    keepConnectionAlive: true,
    url: env.DATABASE_URL,
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    acquireTimeout: env.DB_TIMEOUT,
    rejectUnauthorized: true,
    extra: {
      ssl: env.DB_SSL,
    },
  });
} else if (env.DB_TYPE === 'sqlite') {
  Object.assign(config, {
    type: 'sqlite',
  });
} else {
  throw new Error('Não há um outro tipo de banco de dados suportado, por favor, altere para MySQL o valor de DB_TYPE.');
}

module.exports = config;
