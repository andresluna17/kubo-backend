import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Pelicula } from "./pelicula.model";
import { User } from "./user.model";

@Entity()
export class Calificacion {
  @PrimaryGeneratedColumn()
  id!: Number;

  @Column({ default: 0 })
  calificacion!: Number;

  @Column({ default: false })
  vista!: boolean;

  @ManyToOne(() => User, (user) => user.peliculas)
  user!: User;

  @ManyToOne(() => Pelicula, (peliculas) => peliculas.calificaciones)
  pelicula!: Pelicula;
}
