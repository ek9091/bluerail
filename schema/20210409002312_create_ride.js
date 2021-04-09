exports.up = function (knex) {
  return knex.schema.createTable("ride", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("user.id");
    table.integer("driver_id").unsigned().notNullable();
    table.foreign("driver_id").references("user.id");
    table.integer("from_id").unsigned().notNullable();
    table.foreign("from_id").references("location.id");
    table.integer("to_id").unsigned().notNullable();
    table.foreign("to_id").references("location.id");
    table.time("ride_time").notNullable();
    table.date("ride_date").notNullable();
    table.decimal("ride_length", 7, 2).unsigned();
    table.decimal("driver_fee", 3, 2).unsigned();
    table.decimal("amount", 5, 2).unsigned().defaultTo(0);
    table.specificType("ride_status", "tinyint(1)").defaultTo(0);
    table.specificType("payment_status", "tinyint(1)").defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("ride");
};
