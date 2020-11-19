import { Express } from "express";
import { AuthController } from "./auth.controller";

export default class AuthModule {
  controller: AuthController;

  constructor(app: Express) {
    this.controller = new AuthController();
    app.route("/auth/login").post(this.controller.login);
    app.route("/auth/register").post(this.controller.register);
  }
}
