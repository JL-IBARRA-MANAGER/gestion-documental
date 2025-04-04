// src/vinculacion/entities/vinculacion_practica_tipo.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_vinculacion_practica_tipo')
export class VinculacionPracticaTipo {
  @PrimaryGeneratedColumn({ name: 'VINPT_ID' })
  VINPT_ID: number;

  @Column({ name: 'VINPT_NOMBRE' })
  VINPT_NOMBRE: string;

  @Column({ name: 'VINPT_ESTADO' })
  VINPT_ESTADO: number;
}
