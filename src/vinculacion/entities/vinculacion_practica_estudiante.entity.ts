import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_vinculacion_practica_estudiante')
export class VinculacionPracticaEstudiante {
  @PrimaryGeneratedColumn()
  VINPE_ID: number;

  @Column()
  EST_CEDULA: string;

  @Column()
  VINP_ID: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  VINPE_FECHA_REGISTRO: Date;

  @Column()
  VINPE_ESTADO_PRACTICA: string;

  @Column({ nullable: true })
  VINPE_OBSERVACION: string;

  @Column({ nullable: true })
  VINPE_CETIFICADO: string;

  @Column({ default: 1 })
  VINPE_ESTADO: number;
}
