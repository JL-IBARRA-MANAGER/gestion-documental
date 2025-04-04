import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_carrera')
export class Carrera {
  @PrimaryGeneratedColumn()
  CAR_ID: number;

  @Column()
  CTIP_ID: number;

  @Column()
  CAR_CODIGO: string;

  @Column()
  CAR_NOMBRE: string;

  @Column()
  CAR_CARRERA: string;

  @Column()
  CAR_ESCUELA: string;

  @Column()
  CAR_PADREESC: string;

  @Column()
  CAR_ACTIVA: boolean;

  @Column()
  CAR_ACTIVA_ESCUELA: boolean;

  @Column()
  CAR_CAMPUS: string;

  @Column()
  CAR_ESTADO: number;
}
