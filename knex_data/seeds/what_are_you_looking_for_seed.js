/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  await knex("what_are_you_looking_for").del();

  const now = knex.fn.now();

  await knex("what_are_you_looking_for").insert([
    {
      id: 1,
      user_id: 1,
      looking_for: "love_serious_relationship",
      is_active: true,
      created_at: now,
      updated_at: now,
    },
    {
      id: 2,
      user_id: 2,
      looking_for: "fun_and_flirts",
      is_active: true,
      created_at: now,
      updated_at: now,
    },
    {
      id: 3,
      user_id: 3,
      looking_for: "social_networking",
      is_active: true,
      created_at: now,
      updated_at: now,
    },
  ]);
}
