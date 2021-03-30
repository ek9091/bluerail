import config from "../../../../knexfile";
import knex from "knex";

export const db = knex(config[process.env.NODE_ENV]);

export default db;
