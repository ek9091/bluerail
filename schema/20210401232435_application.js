exports.up = function (knex) {
  return knex.schema.createTable("application", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("user.id");
    table.string("license", 8).notNullable();
    table.text("history").notNullable();
    table.text("background");
    table.string("ref1_name", 65).notNullable();
    table.string("ref1_phone", 11);
    table.string("ref1_email", 50);
    table.string("ref2_name", 65).notNullable();
    table.string("ref2_phone", 11);
    table.string("ref2_email", 50);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("application");
};
