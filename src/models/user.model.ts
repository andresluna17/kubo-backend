import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Calificacion } from "./calificacion.model";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password?: string;

  @OneToMany(() => Calificacion, (Calificacion) => Calificacion.user)
  peliculas!: Calificacion[];
}
