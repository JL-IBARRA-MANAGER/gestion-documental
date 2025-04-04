// src/aprehenser/entities/desarrollo_curso.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_aprehenser_desarrollo_curso')
export class DesarrolloCurso {
  @PrimaryGeneratedColumn()
  DESC_ID: number;

  @Column()
  DESC_TEMA: string;

  @Column()
  DESC_DURACION: string;

  @Column()
  DESC_ITINERARIO: string;

  @Column({ type: 'date' })
  DESC_FECHADESDE: string;

  @Column({ type: 'date' })
  DESC_FECHAHASTA: string;

  @Column({ type: 'int' })
  AMB_ID: number;

  @Column({ type: 'int' })
  EDC_ID: number;

  @Column({ type: 'int', default: 1 })
  DESC_ESTADO: number;

  @Column()
  DESC_IMAGEN: string;

  @Column({ type: 'int' })
  TDC_ID: number;

  @Column({ type: 'numeric' })
  DESC_VALOR: number;

  @Column({ type: 'text' })
  DESC_CONTENIDO: string;
}
