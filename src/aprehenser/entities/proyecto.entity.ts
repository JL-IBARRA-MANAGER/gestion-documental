// src/aprehenser/entities/proyecto.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_aprehenser_categoria_convocatoria_proyecto')
export class Proyecto {
  @PrimaryGeneratedColumn()
  PRO_ID: number;

  @Column()
  PRO_NOMBRE: string;

  @Column()
  PRO_IMAGEN: string;

  @Column()
  PRO_EN_MARCHA: number;

  @Column()
  PRO_ESTADO: number;

  @Column()
  CONV_ID: number;
}
