/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Clear existing data
  await knex("looking_for_options").del();

  // Insert seed entries
  await knex("looking_for_options").insert([
    {
      title: "Love (Serious Relationship)",
      is_active: true,
    },
    {
      title: "Fun & Flirts",
      is_active: true,
    },
    {
      title: "Sugar Dating",
      is_active: true,
    },
  ]);
}
