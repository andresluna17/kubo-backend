import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verificaToken = (req: Request, res: Response, next: NextFunction) => {
  let token: any = req.headers.authorization;
  jwt.verify(token, process.env.SEED || "", (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        mensaje: "Token incorrecto",
        errors: err
      });
    }
    req.body.user = decoded.usuario;
    next();
  });
};
