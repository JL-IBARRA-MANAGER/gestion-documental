// src/global_sede/entities/global_sede.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_global_sede')
export class GlobalSede {
  @PrimaryGeneratedColumn({ name: 'SEDE_ID' })
  id: number;

  @Column({ name: 'SEDE_NOMBRE' })
  nombre: string;

  @Column({ name: 'SEDE_ESTADO' })
  estado: number;
}
