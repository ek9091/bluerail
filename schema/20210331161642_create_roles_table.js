exports.up = function (knex) {
  return knex.schema.createTable("role", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("user.id");
    table.string("role", 20).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("role");
};
