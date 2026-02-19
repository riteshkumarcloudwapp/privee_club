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

    // REQUIRED (SIGNUP)
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

    mobile_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    language: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "en",
    },

    // OPTIONAL PROFILE FIELDS
    best_pic: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: true,
    },

    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    body_type: {
      type: DataTypes.ENUM("slim", "average", "athletic", "heavy"),
      allowNull: true,
    },

    hair_color: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    eye_color: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    nationality: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    region: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    sexual_orientation: {
      type: DataTypes.ENUM("straight", "gay", "lesbian", "bisexual", "other"),
      allowNull: true,
    },

    education: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    field_of_work: {
      type: DataTypes.STRING,
      allowNull: true,
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
      allowNull: true,
    },

    drinking: {
      type: DataTypes.ENUM("no", "occasionally", "yes"),
      allowNull: true,
    },

    tattoos: {
      type: DataTypes.ENUM("yes", "no"),
      allowNull: true,
    },

    piercings: {
      type: DataTypes.ENUM("yes", "no"),
      allowNull: true,
    },

    about_me: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    about_perfect_match: {
      type: DataTypes.TEXT,
      allowNull: true,
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
      allowNull: true,
    },

    favorite_music: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    favorite_tv_show: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    favorite_movie: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    favorite_book: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    favorite_sport: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    other: {
      type: DataTypes.STRING(255),
      allowNull: true,
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
      allowNull: true,
    },

    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expiry_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
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
