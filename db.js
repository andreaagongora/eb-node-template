const { Sequelize } = require("sequelize");
require('dotenv').config()


const prod = !!process.env.DB_HOST;

const sequelize = new Sequelize(
  process.env.DB_DATABASE || "postgres",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "postgres",
  {
    host: process.env.DB_HOST || "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false,
    pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
    // RDS con PostgreSQL 15+ exige SSL por defecto
    dialectOptions: prod
      ? { ssl: { require: true, rejectUnauthorized: false } }
      : {},
  }
);

module.exports = sequelize;
