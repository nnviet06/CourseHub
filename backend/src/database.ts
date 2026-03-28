// Initialize Sequelize instance and connect to postgres database
import { initUserModel } from "./models/users";
import { initCourseModel } from "./models/courses";
import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(
  "course_hub",
  process.env.DB_USER!,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: "postgres",
    port: parseInt(process.env.DB_PORT || '5432')
  },
);

export const connectDatabase = async () => {
  try {
    initUserModel(sequelize);
    initCourseModel(sequelize)
    await sequelize.authenticate();
  } catch (err) {
    throw err
  }
}

export default sequelize;
