import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';  

@Entity('tbl_vinculacion_practica_estudiante_registro')  
export class AsistenciaEstudiante {  
  @PrimaryGeneratedColumn()  
  VINPR_ID: number;  

  @Column({ type: 'timestamp' })  
  VINPR_FECHA_ENTRADA: Date;  

  @Column({ type: 'timestamp' })  
  VINPR_FECHA_SALIDA: Date;  

  @Column({ type: 'varchar', length: 1000, nullable: true })  
  VINPR_OBSERVACION: string;  

  @Column({ type: 'integer', default: 1 })  
  VINPR_ESTADO: number;  

  @Column({ type: 'integer' })  
  USU_ID: number;  
}