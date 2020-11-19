import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { createConnection } from "typeorm";
import { DBoptions } from "./database";
import CategoriaModule from "./modules/categoria/categoria.module";
import AuthModule from "./modules/auth/auth.module";
import PeliculaModule from "./modules/pelicula/pelicula.module";
import CalificacionModule from "./modules/calificacion/calificacion.module";

export default class App {
  private app;

  constructor() {
    dotenv.config();
    this.app = express();
    this.middlewares();
    createConnection(DBoptions)
      .then(() => {
        console.log("conectado a la base de datos");
        this.initModules();
      })
      .catch((error) => console.log(error));
    this.listen();
  }

  private middlewares = () => {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  };

  private initModules = () => {
    new PeliculaModule(this.app);
    new CalificacionModule(this.app);
    new CategoriaModule(this.app);
    new AuthModule(this.app);
  };

  private listen = async () => {
    await this.app.listen(process.env.PORT);
    console.log("Server corriendo en el puerto " + process.env.PORT);
  };
}
