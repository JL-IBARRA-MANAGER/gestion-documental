import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_aprehenser_categoria_convocatoria_proyecto_detalle')
export class AprehenserProyectoDetalle {
  @PrimaryGeneratedColumn()
  DETP_ID: number;

  @Column()
  PRO_ID: number;

  @Column({ nullable: true })
  DETP_COORDINADOR: string;

  @Column({ nullable: true })
  DETP_ESCUELAS: string;

  @Column({ nullable: true })
  DETP_LINEACION: string;

  @Column({ nullable: true })
  DETP_DESCRIPCION: string;

  @Column({ nullable: true })
  DETP_VIDEO: string;
}
