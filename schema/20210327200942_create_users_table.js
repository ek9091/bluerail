exports.up = function (knex) {
  return knex.schema.createTable("user", (table) => {
    table.increments("id").primary();
    table.string("first_name", 30).notNullable();
    table.string("last_name", 30).notNullable();
    table.string("email", 50).notNullable().unique();
    table.string("hash").notNullable();
    table.datetime("last_login").defaultTo(knex.fn.now());
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user");
};
