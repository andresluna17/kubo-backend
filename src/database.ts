import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";

dotenv.config();
export const DBoptions: ConnectionOptions = {
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  entities: ["src/models/*.ts"],
  synchronize: true
};
