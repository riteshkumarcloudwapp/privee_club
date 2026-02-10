export function up(knex) {
  return knex.schema.createTable("user_photos", (table) => {
    table.increments("id").primary();

    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.text("image").nullable();
    table.string("title").notNullable(); // 0-> for gallery and 1->private_photos

    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTable("user_photos");
}
