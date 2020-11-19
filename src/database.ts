import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";
import { User } from "./models/user.model";
import Categoria from "./models/categoria.model";
import { Pelicula } from "./models/pelicula.model";
import { Calificacion } from "./models/calificacion.model";

dotenv.config();
export const DBoptions: ConnectionOptions = {
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  entities: [User, Categoria, Pelicula, Calificacion],
  synchronize: true
};
