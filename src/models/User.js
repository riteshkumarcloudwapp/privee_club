import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    profile_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    best_pic: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    mobile_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: false,
    },

    language: {
      type: DataTypes.STRING,
      defaultValue: "en",
    },

    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    height: {
      type: DataTypes.INTEGER,
    },

    weight: {
      type: DataTypes.INTEGER,
    },

    body_type: {
      type: DataTypes.ENUM("slim", "average", "athletic", "heavy"),
      allowNull: true,
    },

    hair_color: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    eye_color: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    sexual_orientation: {
      type: DataTypes.ENUM("straight", "gay", "lesbian", "bisexual", "other"),
      allowNull: false,
    },

    education: {
      type: DataTypes.STRING,
    },

    field_of_work: {
      type: DataTypes.STRING,
    },

    relationship_status: {
      type: DataTypes.ENUM(
        "single",
        "married",
        "divorced",
        "widowed",
        "separated",
      ),
      allowNull: true,
    },

    zodiac_sign: {
      type: DataTypes.ENUM(
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
      ),
      allowNull: true,
    },

    smoking: {
      type: DataTypes.ENUM("no", "occasionally", "yes"),
      defaultValue: "no",
    },

    drinking: {
      type: DataTypes.ENUM("no", "occasionally", "yes"),
      defaultValue: "no",
    },

    tattoos: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    piercings: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    about_me: {
      type: DataTypes.TEXT,
    },

    about_perfect_match: {
      type: DataTypes.TEXT,
    },

    interested_in: {
      type: DataTypes.ENUM(
        "favorite_music",
        "favorite_tv_show",
        "favorite_movie",
        "favorite_book",
        "favorite_sport",
        "other",
      ),
    },

    favorite_music: {
      type: DataTypes.STRING(255),
    },

    favorite_tv_show: {
      type: DataTypes.STRING(255),
    },

    favorite_movie: {
      type: DataTypes.STRING(255),
    },

    favorite_book: {
      type: DataTypes.STRING(255),
    },

    favorite_sport: {
      type: DataTypes.STRING(255),
    },

    other: {
      type: DataTypes.STRING(255),
    },

    source: {
      type: DataTypes.ENUM(
        "google",
        "chatgpt_ai",
        "instagram",
        "facebook",
        "tiktok",
        "magazine",
        "friend_family",
        "event",
        "other",
      ),
      allowNull: false,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export default User;
