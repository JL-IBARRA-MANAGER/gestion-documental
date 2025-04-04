// src/vinculacion/entities/vinculacion_cine_campo_detallado.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_vinculacion_cine_campo_detallado')
export class VinculacionCineCampoDetallado {
  @PrimaryGeneratedColumn()
  VCCD_ID: number;

  @Column()
  VCCE_ID: number;

  @Column()
  VCCD_CODIGO: string;

  @Column()
  VCCD_DESCRIPCION: string;

  @Column()
  VCCD_ESTADO: number;
}
