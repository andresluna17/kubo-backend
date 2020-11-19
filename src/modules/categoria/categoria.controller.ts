import { Response, Request } from "express";
import { getManager } from "typeorm";
import Categoria from "../../models/categoria.model";

export default class CategoriaController {
  async getAllCategorias(req: Request, res: Response) {
    const categorias = await getManager().getRepository(Categoria).find();
    res.status(200).json({ ok: true, categorias, totalCategorias: categorias.length });
  }

  async createCategoria(req: Request, res: Response) {
    const { nombre } = req.body;
    let newCategoria = new Categoria();
    newCategoria.nombre = nombre;
    const categoriaDB = await getManager().getRepository(Categoria).save(newCategoria);
    res.status(200).json({ ok: true, categoria: categoriaDB });
  }
}
