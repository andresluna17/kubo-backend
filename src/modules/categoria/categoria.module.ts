import { Express } from "express";
import { verificaToken } from "../../middlewares/auth.middleware";
import CategoriaController from "./categoria.controller";

export default class CategoriaModule {
  controller: CategoriaController;

  constructor(app: Express) {
    this.controller = new CategoriaController();
    app
      .route("/categoria")
      .get(verificaToken, this.controller.getAllCategorias)
      .post(verificaToken, this.controller.createCategoria);
  }
}
