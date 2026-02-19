import bcrypt from "bcrypt";

export async function seed(knex) {
  await knex("admins").del();

  const hashedPassword = await bcrypt.hash("12345678", 8);

  await knex("admins").insert([
    {
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    },
  ]);
}
