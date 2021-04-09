exports.up = function (knex) {
  return knex.schema.createTable("driver_settings", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("user.id");
    table.string("make", 30);
    table.string("model", 30);
    table.string("year", 4);
    table.integer("service_location", 1);
    table.integer("max_distance", 4);
    table.decimal("driver_fee", 3, 2).notNullable();
    table.specificType("status", "tinyint(1)").defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("driver_settings");
};
