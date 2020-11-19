import { Response, Request } from "express";
import { getManager } from "typeorm";
import { Calificacion } from "../../models/calificacion.model";
import Categoria from "../../models/categoria.model";
import { Pelicula } from "../../models/pelicula.model";

export default class CalificacionController {
  async addCalificacionAndView(req: Request, res: Response) {
    try {
      const { user, calificacion, vista, idPelicula } = req.body;
      const pelicula = await getManager().getRepository(Pelicula).findOne(idPelicula);
      let calificacionDB = await getManager()
        .getRepository(Calificacion)
        .findOne({ where: { pelicula, user } });
      if (calificacionDB) {
        calificacionDB.calificacion = calificacion;
        calificacionDB.vista = vista;
        await getManager().getRepository(Calificacion).save(calificacionDB);
      } else {
        let data = {
          user,
          pelicula,
          calificacion,
          vista
        };
        const newCalificacion = await getManager()
          .getRepository(Calificacion)
          .create(data);
        await getManager().getRepository(Calificacion).save(newCalificacion);
      }
      const newPelicula = await getManager()
        .getRepository(Pelicula)
        .findOne(idPelicula, { relations: ["calificaciones"] });
      res.status(200).json({ ok: true, pelicula: newPelicula });
    } catch (error) {
      res.status(500).json({ ok: false, error });
    }
  }
}
