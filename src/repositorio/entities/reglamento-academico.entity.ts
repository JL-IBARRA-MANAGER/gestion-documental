// src/repository/entities/reglamento-academico.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_repositorio_reglamento_regimen_academico')
export class ReglamentoAcademico {
  @PrimaryGeneratedColumn({ name: 'RRA_ID' })
  id: number;

  @Column({ name: 'RRA_FECHA', type: 'date' })
  fecha: Date;

  @Column({ name: 'RRA_NOMBRE', type: 'varchar', length: 100 })
  nombre: string;

  @Column({ name: 'RRA_OBSERVACION', type: 'varchar', length: 255, nullable: true })
  observacion: string;

  @Column({ name: 'RRA_RUTA', type: 'varchar', length: 255 })
  ruta: string;

  @Column({ name: 'RRA_ESTADO', type: 'int', default: 1 })
  estado: number;
}
