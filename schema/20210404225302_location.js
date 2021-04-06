exports.up = function (knex) {
  return knex.schema.createTable("location", (table) => {
    table.increments("id").primary();
    table.string("place_id").notNullable().unique();
    table.string("street", 50).nullable().defaultTo("");
    table.string("city", 50).notNullable();
    table.string("state", 2).notNullable();
    table.string("zip_code", 10).nullable();
    table.decimal("latitude", 9, 7).notNullable();
    table.decimal("longitude", 9, 7).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("location");
};
