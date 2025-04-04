import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('titulacion')
export class Titulacion  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}
