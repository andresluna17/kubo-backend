import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany
} from "typeorm";
import { Calificacion } from "./calificacion.model";
import Categoria from "./categoria.model";

@Entity()
export class Pelicula {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  imagen!: string;

  @Column()
  titulo!: string;

  @Column({ type: "text" })
  descripcion!: string;

  @Column()
  duracion!: number;

  @Column()
  trailer!: string;

  @Column({ type: "date" })
  estreno!: Date;

  @OneToMany(() => Calificacion, (Calificacion) => Calificacion.pelicula)
  calificaciones!: Calificacion[];

  @ManyToMany(() => Categoria)
  @JoinTable()
  categorias!: Categoria[];
}
