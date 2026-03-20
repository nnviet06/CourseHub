// Sequelize instance and database connection logic

import { Sequelize } from "sequelize"
import 'dotenv/config'


export const sequelize = new Sequelize(
  "course_hub",
  process.env.DB_USER!,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
  },
);

export const connectDatabase = async () => { 
    try {
        await sequelize.authenticate()
        console.log('connected successfully')
    } catch (error){
        console.error('error:', error)
    }
}

