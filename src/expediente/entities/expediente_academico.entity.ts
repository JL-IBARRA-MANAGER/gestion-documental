import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_expediente_academico')
export class ExpedienteAcademico {
  @PrimaryGeneratedColumn()
  EXPA_ID: number;

  @Column()
  EXPA_IDENTIFICACION: string;

  @Column()
  EXPTT_ID: number;

  @Column()
  PER_ID: number;

  @Column()
  EXPA_OBSERVACION: string;

  @Column()
  EXPA_ESTADO: number;

  @Column()
  CAR_ID: number;

}
