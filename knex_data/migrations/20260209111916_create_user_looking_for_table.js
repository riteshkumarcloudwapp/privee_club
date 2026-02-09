export function up(knex) {
  return knex.schema.createTable("user_looking_for", (table) => {
    table.increments("id").primary();

    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table
      .integer("looking_for_option_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("looking_for_options")
      .onDelete("CASCADE");

    table.timestamps(true, true);

    // prevent duplicates like (user_id=1, option_id=3) twice
    table.unique(["user_id", "looking_for_option_id"]);
  });
}

export function down(knex) {
  return knex.schema.dropTable("user_looking_for");
}
