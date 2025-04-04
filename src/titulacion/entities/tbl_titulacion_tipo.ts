import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('tbl_titulacion_tipo')
export class TitulacionTipo {
  @PrimaryColumn()
  TIPO_ID: number;

  @Column()
  TIPO_NOMBRE: string;

  @Column()
  TIPO_ESTADO: number;
}
