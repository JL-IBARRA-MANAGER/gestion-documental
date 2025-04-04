import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_vinculacion_practica_estudiante_estados')
export class VinculacionPracticaEstudianteEstados {
  @PrimaryGeneratedColumn()
  VINPEE_ID: number;

  @Column()
  VINPEE_NOMBRE: string;

  @Column({ default: 1 })
  VINPEE_ESTADO: number;
}
