import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_titulacion_carrera_malla')
export class TitulacionCarreraMalla {
  @PrimaryGeneratedColumn()
  TITCM_ID: number;

  @Column()
  CAR_ID: number;

  @Column()
  MALLA_ID: number;

  @Column()
  MODT_ID: number; 

  @Column()
  TITCM_ESTADO: number;
}
