exports.up = function (knex) {
  return knex.schema.createTable("user", (table) => {
    table.increments("id").primary();
    table.string("first_name", 30).notNullable();
    table.string("last_name", 30).notNullable();
    table.string("email").notNullable().unique();
    table.string("hash").notNullable();
    table.integer("status", 2).defaultTo(0);
    table.datetime("last_login").defaultTo(knex.fn.now());
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user");
};
