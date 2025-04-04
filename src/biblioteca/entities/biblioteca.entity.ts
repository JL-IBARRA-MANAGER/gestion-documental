import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_titulacion')
export class Titulacion {
  @PrimaryGeneratedColumn()
  TITU_ID: number;

  @Column()
  TITU_CEDULA: string;

  @Column()
  TITU_NOMBRES: string;

  @Column()
  CAR_ID: number;

  @Column()
  MODT_ID: number;

  @Column()
  MALLA_ID: number;

  @Column({ default: '0' })
  TITU_SIMILITUD_INF: string;

  @Column()
  TITU_TITULO: string;

  @Column({ default: '0' })
  TITU_FECHA_DEF: string;

  @Column({ default: 1 })
  TITU_ESTADO: number;

  @Column({ default: 0 })
  TITU_ARCHIVO: number;

  @Column()
  TITU_REGISTRO_TUTORIAS: string;

  @Column({ default: 0 })
  TITU_BIBLIOTECA: number;

  @Column()
  TITU_BIBLIOTECA_URL: string;

  @Column()
  TITU_BIBLIOTECA_SENESCYT: string;

  @Column()
  TITU_BIBLIOTECA_PDF: string;

  @Column()
  TITU_BIBLIOTECA_DECLARACION: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  TITU_LOG: Date;

  @Column({ nullable: true })
  TITU_BIBLIOTECA_OBSERVACION: string;
}
