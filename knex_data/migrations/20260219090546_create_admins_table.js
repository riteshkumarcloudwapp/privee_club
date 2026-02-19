/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("admins", (table) => {
    table.increments("id").primary();
    table.string("email").nullable();
    table.string("password").nullable();
    table.string("role").defaultTo("admin");
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("amdins");
}
