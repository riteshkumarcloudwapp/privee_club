/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("profile_name").notNullable();
    table.string("email").unique().notNullable();
    table.text("selfie").notNullable();
    table.text("best_pic").notNullable();
    table.string("mobile_number").notNullable();
    table.string("password").notNullable();
    table.enu("gender", ["male", "female", "other"]).notNullable();
    table.string("language").notNullable().defaultTo("en");
    table.date("dob").notNullable();
    table.integer("height"); // cm
    table.integer("weight"); // kg
    table.enu("body_type", ["slim", "average", "athletic", "heavy"]).nullable();
    table.string("hair_color").notNullable();
    table.string("eye_color").notNullable();

    table.string("nationality").notNullable();
    table.string("region").notNullable();
    table.string("city").notNullable();

    table
      .enu("sexual_orientation", [
        "straight",
        "gay",
        "lesbian",
        "bisexual",
        "other",
      ])
      .notNullable();

    table.string("education");
    table.string("field_of_work");

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

    table.enu("smoking", ["no", "occasionally", "yes"]).defaultTo("no");

    table.enu("drinking", ["no", "occasionally", "yes"]).defaultTo("no");

    table.boolean("tattoos").defaultTo(false);
    table.boolean("piercings").defaultTo(false);

    table.text("about_me");
    table.text("about_perfect_match");
    table.enu("interested_in", [
      "favorite_music",
      "favorite_tv_show",
      "favorite_movie",
      "favorite_book",
      "favorite_sport",
      "other",
    ]);
    table.string("favorite_music", 255);
    table.string("favorite_tv_show", 255);
    table.string("favorite_movie", 255);
    table.string("favorite_book", 255);
    table.string("favorite_sport", 255);
    table.string("other", 255);
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
      .notNullable();
    table.boolean("is_active");
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
