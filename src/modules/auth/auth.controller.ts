import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getManager } from "typeorm";
import { User } from "../../models/user.model";

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      let { email, password } = req.body;
      let user = await getManager().getRepository(User).findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({
          ok: false,
          mensaje: "Credenciales incorrectas"
        });
      }
      if (!bcrypt.compareSync(password, user.password || "")) {
        return res.status(400).json({
          ok: false,
          mensaje: "Credenciales incorrectas"
        });
      }
      delete user.password;
      let token = jwt.sign({ usuario: user }, process.env.SEED || "", {
        expiresIn: 14400
      }); // 4 horas
      res.status(200).json({
        ok: true,
        token
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        ok: false,
        error
      });
    }
  }
  async register(req: Request, res: Response) {
    try {
      let { email, password, nombre } = req.body;
      let data = {
        nombre,
        email,
        password: bcrypt.hashSync(password, 10)
      };
      let user = getManager().getRepository(User).create(data);
      await getManager().getRepository(User).save(user);
      res.status(200).json({
        ok: true,
        message: "nuevo usuario creado"
      });
    } catch (error) {
      return res.status(400).json({
        ok: false,
        error
      });
    }
  }
}
