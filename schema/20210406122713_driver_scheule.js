exports.up = function (knex) {
  return knex.schema.createTable("driver_schedule", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("user.id");
    table.time("start_time").notNullable();
    table.time("end_time").notNullable();
    table.specificType("monday", "tinyint(1)").defaultTo(0);
    table.specificType("tuesday", "tinyint(1)").defaultTo(0);
    table.specificType("wednesday", "tinyint(1)").defaultTo(0);
    table.specificType("thursday", "tinyint(1)").defaultTo(0);
    table.specificType("friday", "tinyint(1)").defaultTo(0);
    table.specificType("saturday", "tinyint(1)").defaultTo(0);
    table.specificType("sunday", "tinyint(1)").defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("driver_schedule");
};
