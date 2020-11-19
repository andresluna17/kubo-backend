import { type } from "os";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Categoria {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;
}
