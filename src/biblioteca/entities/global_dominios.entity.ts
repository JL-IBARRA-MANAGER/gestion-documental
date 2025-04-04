import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_global_dominios')
export class GlobalDominios {
  @PrimaryGeneratedColumn()
  GDOM_ID: number;

  @Column()
  GDOM_DOMINIO: string;

  @Column()
  GDOM_DESCRIPCION: string;
}
