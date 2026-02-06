/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();

    // REQUIRED FIELDS (signup)
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("profile_name").notNullable();
    table.string("email").notNullable().unique();
    table.string("mobile_number").notNullable();
    table.string("password").notNullable();
    table.string("language").notNullable().defaultTo("en");

    // OPTIONAL PROFILE FIELDS
    table.text("best_pic").nullable();
    table.enu("gender", ["male", "female", "other"]).nullable();
    table.date("dob").nullable();

    table.integer("height").nullable(); // cm
    table.integer("weight").nullable(); // kg

    table.enu("body_type", ["slim", "average", "athletic", "heavy"]).nullable();

    table.string("hair_color").nullable();
    table.string("eye_color").nullable();

    table.string("nationality").nullable();
    table.string("region").nullable();
    table.string("city").nullable();

    table
      .enu("sexual_orientation", [
        "straight",
        "gay",
        "lesbian",
        "bisexual",
        "other",
      ])
      .nullable();

    table.string("education").nullable();
    table.string("field_of_work").nullable();

    table
      .enu("relationship_status", [
        "single",
        "married",
        "divorced",
        "widowed",
        "separated",
      ])
      .nullable();

    table
      .enu("zodiac_sign", [
        "aries",
        "taurus",
        "gemini",
        "cancer",
        "leo",
        "virgo",
        "libra",
        "scorpio",
        "sagittarius",
        "capricorn",
        "aquarius",
        "pisces",
      ])
      .nullable();

    table.enu("smoking", ["no", "occasionally", "yes"]).nullable();
    table.enu("drinking", ["no", "occasionally", "yes"]).nullable();

    table.enu("tattoos", ["yes", "no"]).nullable();
    table.enu("piercings", ["yes", "no"]).nullable();

    table.text("about_me").nullable();
    table.text("about_perfect_match").nullable();

    table
      .enu("interested_in", [
        "favorite_music",
        "favorite_tv_show",
        "favorite_movie",
        "favorite_book",
        "favorite_sport",
        "other",
      ])
      .nullable();

    table.string("favorite_music", 255).nullable();
    table.string("favorite_tv_show", 255).nullable();
    table.string("favorite_movie", 255).nullable();
    table.string("favorite_book", 255).nullable();
    table.string("favorite_sport", 255).nullable();
    table.string("other", 255).nullable();

    table
      .enu("source", [
        "google",
        "chatgpt_ai",
        "instagram",
        "facebook",
        "tiktok",
        "magazine",
        "friend_family",
        "event",
        "other",
      ])
      .nullable();

    table.boolean("is_active").defaultTo(false);

    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("users");
}
