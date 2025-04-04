import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_vinculacion_cine_campo_amplio')
export class VinculacionCineCampoAmplio {
  @PrimaryGeneratedColumn()
  VCCA_ID: number;

  @Column()
  VCCA_CODIGO: string;

  @Column()
  VCCA_DESCRIPCION: string;

  @Column({ default: 1 })
  VCCA_ESTADO: number;
}
