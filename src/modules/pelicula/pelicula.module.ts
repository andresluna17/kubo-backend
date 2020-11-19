import { Express } from "express";
import { verificaToken } from "../../middlewares/auth.middleware";
import PeliculaController from "./pelicula.controller";

export default class PeliculaModule {
  controller: PeliculaController;

  constructor(app: Express) {
    this.controller = new PeliculaController();
    app
      .route("/pelicula")
      .get(verificaToken, this.controller.getAllPeliculas)
      .post(verificaToken, this.controller.createPelicula);
    app
      .route("/pelicula/:id")
      .get(verificaToken, this.controller.getByIdPelicula)
      .put(verificaToken, this.controller.updatePelicula)
      .delete(verificaToken, this.controller.deletePelicula);
  }
}
