// Initialize Sequelize instance and connect to postgres database

import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(
  "course_hub",
  process.env.DB_USER!,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
  },
);

export default sequelize;
