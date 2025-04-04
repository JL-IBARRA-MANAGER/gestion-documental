import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_titulacion')
export class Titulacion_tbl {
  @PrimaryGeneratedColumn()
  TITU_ID: number;

  @Column()
  TITU_CEDULA: string;

  @Column()
  TITU_NOMBRES: string;

  @Column()
  CAR_ID: number;

  @Column()
  MODT_ID: number;

  @Column()
  MALLA_ID: number;

  @Column()
  TITU_TITULO: string;

  @Column({ nullable: true })
  TITU_REGISTRO_TUTORIAS: string;

  @Column({ nullable: true })
  TITU_SIMILITUD_INF: string; 
}
