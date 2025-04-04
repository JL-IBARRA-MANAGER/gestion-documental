import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_global_estudiantes')
export class GlobalEstudiantes {
  @PrimaryGeneratedColumn()
  LEST_ID: number;

  @Column()
  SFRSTCR_TERM_CODE: string;

  @Column()
  PERIODO: string;

  @Column()
  CODIGO_CARRERA: string;

  @Column()
  NOMBRE_CARRERA: string;

  @Column()
  ESCUELA: string;

  @Column()
  CIUDAD: string;

  @Column()
  TIPO_IDENTIFICACION: string;

  @Column()
  IDENTIFICACION: string;

  @Column()
  APELLIDOS: string;

  @Column()
  NOMBRES: string;

  @Column()
  SEXO: string;

  @Column()
  ETNIA: string;

  @Column()
  NACIONALIDAD: string;

  @Column()
  EMAIL: string;

  @Column()
  CODIGO_ASIGNATURA: string;

  @Column()
  ASIGNATURA: string;

  @Column()
  NIVEL: string;

  @Column()
  SISTEMA: string;
}
