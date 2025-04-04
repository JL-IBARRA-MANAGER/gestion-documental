// src/vinculacion/entities/vinculacion_cine_campo_especifico.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_vinculacion_cine_campo_especifico')
export class VinculacionCineCampoEspecifico {
  @PrimaryGeneratedColumn()
  VCCE_ID: number;

  @Column()
  VCCA_ID: number;

  @Column()
  VCCE_CODIGO: string;

  @Column()
  VCCE_DESCRIPCION: string;

  @Column()
  VCCE_ESTADO: number;
}
