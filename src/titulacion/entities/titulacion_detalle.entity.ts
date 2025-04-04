import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_titulacion_detalle')
export class TitulacionDetalle {
  @PrimaryGeneratedColumn()
  TITUD_ID: number;

  @Column({ type: 'integer' })
  TITU_ID: number;

  @Column({ type: 'integer' })
  MODTD_ID: number;

  @Column({ type: 'varchar', length: 255 })
  TITUD_TEMA: string;

  @Column({ type: 'varchar', length: 10 })
  TITUD_CEDULA_DOCENTE: string;

  @Column({ type: 'varchar', length: 100 })
  TITUD_DOCENTE: string;

  @Column({ type: 'integer' })
  TIPO_ID: number;

  @Column({ type: 'varchar', length: 5 })
  TITUD_NOTA_INF: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  TITUD_RESPALDO_INF: string;
}
