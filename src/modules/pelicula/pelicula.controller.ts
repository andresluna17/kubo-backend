import { Response, Request } from "express";
import { getManager } from "typeorm";
import Categoria from "../../models/categoria.model";
import { Pelicula } from "../../models/pelicula.model";

export default class PeliculaController {
  async getAllPeliculas(req: Request, res: Response) {
    try {
      let peliculas = await getManager()
        .getRepository(Pelicula)
        .find({ relations: ["categorias", "calificaciones"] });
      res.status(200).json({ ok: true, peliculas, totalPeliculas: peliculas.length });
    } catch (error) {
      console.log(error);
      res.json({ ok: false, error });
    }
  }

  async getByIdPelicula(req: Request, res: Response) {
    const { id } = req.params;
    try {
      let pelicula = await getManager()
        .getRepository(Pelicula)
        .findOne(id, { relations: ["calificaciones"] });
      res.status(200).json({ ok: true, pelicula });
    } catch (error) {
      res.json({ ok: false, error });
    }
  }

  async createPelicula(req: Request, res: Response) {
    try {
      const { categorias, imagen, titulo, duracion, trailer, estreno } = req.body;
      let options = await categorias.map((element: number) => {
        return {
          id: element
        };
      });
      let categoriasDB =
        categorias.length != 0
          ? await getManager().getRepository(Categoria).find({ where: options })
          : [];
      let data = {
        imagen,
        titulo,
        duracion,
        trailer,
        estreno,
        categorias: categoriasDB!
      };
      let newPelicula = getManager().getRepository(Pelicula).create(data);
      let peliculaDB = await getManager().getRepository(Pelicula).save(newPelicula);
      res.status(200).json({ ok: true, pelicula: peliculaDB });
    } catch (error) {
      console.log(error);
      res.json({ ok: false, error });
    }
  }

  async updatePelicula(req: Request, res: Response) {
    try {
      const { categorias, imagen, titulo, duracion, trailer, estreno } = req.body;
      const { id } = req.params;
      let options = await categorias.map((element: number) => {
        return {
          id: element
        };
      });
      let categoriasDB =
        categorias.length != 0
          ? await getManager().getRepository(Categoria).find({ where: options })
          : [];
      let peliculaDB = await getManager().getRepository(Pelicula).findOne(id);
      peliculaDB!.categorias = categoriasDB!;
      peliculaDB!.imagen = imagen;
      peliculaDB!.titulo = titulo;
      peliculaDB!.duracion = duracion;
      peliculaDB!.trailer = trailer;
      peliculaDB!.estreno = estreno;
      const PeliculaUpdate = await getManager().getRepository(Pelicula).save(peliculaDB!);
      res.status(200).json({ ok: true, pelicula: PeliculaUpdate });
    } catch (error) {
      console.log(error);
      console.log(req.body);
    }
  }

  async deletePelicula(req: Request, res: Response) {
    const { id } = req.params;
    const pelicula = await getManager().getRepository(Pelicula).findOne(id);
    await getManager().getRepository(Pelicula).delete(pelicula!);
    res.status(201).json({ ok: true });
  }
}
