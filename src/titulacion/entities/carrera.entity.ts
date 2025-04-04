import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_carrera')
export class Carrera {
  @PrimaryGeneratedColumn()
  CAR_ID: number;

  @Column()
  CAR_NOMBRE: string;

  @Column()
  CAR_ACTIVA: string;

  @Column()
  CAR_ESCUELA: string;

  @Column()
  CAR_PADREESC: number;

  @Column()
  CAR_CARRERA: string;

  @Column()
  CAR_ESTADO: number;

  @Column()
  CAR_ACTIVA_ESCUELA: string;
}
