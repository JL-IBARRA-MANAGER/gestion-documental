import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_modalida_titulacion')
export class ModalidadTitulacion {
  @PrimaryGeneratedColumn()
  MODT_ID: number;

  @Column()
  MODT_NOMBRE: string;

  @Column()
  MODT_ESTADO: number;
}
