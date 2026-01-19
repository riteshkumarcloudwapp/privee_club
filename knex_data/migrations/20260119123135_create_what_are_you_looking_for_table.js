export function up(knex) {
  return knex.schema.createTable("what_are_you_looking_for", (table) => {
    table.increments("id").primary();

    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table
      .enu("looking_for", [
        "love_serious_relationship",
        "fun_and_flirts",
        "sugardating",
        "social_networking",
        "commercial_networking",
        "invites_to_parties_events",
      ])
      .notNullable();
    table.boolean("is_active");
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable("what_are_you_looking_for");
}
