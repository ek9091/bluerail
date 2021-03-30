require("custom-env").env("local");

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      charset: "utf8",
    },
    migrations: {
      tableName: "migrations",
      directory: "./schema/",
    },
    debug: true,
  },

  production: {
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      charset: "utf8",
    },
    migrations: {
      tableName: "migrations",
      directory: "./schema/",
    },
  },
};
