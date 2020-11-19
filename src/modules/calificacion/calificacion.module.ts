import { Express } from "express";
import { verificaToken } from "../../middlewares/auth.middleware";
import CalificacionController from "./calificacion.controller";

export default class CalificacionModule {
  controller: CalificacionController;

  constructor(app: Express) {
    this.controller = new CalificacionController();
    app
      .route("/calificacion")
      .post(verificaToken, this.controller.addCalificacionAndView);
  }
}
