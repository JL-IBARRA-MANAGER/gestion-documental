import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';  

@Entity('tbl_vinculacion_practica_estudiante_seguimiento')  
export class PracticaSeguimiento {  
  @PrimaryGeneratedColumn()  
  VINPES_ID: number;  

  @Column()  
  VINPE_ID: number;  

  @Column({ type: 'timestamp' })  
  VINPES_FECHA_REGISTRO: Date;  

  @Column({ type: 'varchar', length: 500, nullable: true })  
  VINPES_OBSERVACION: string;  

  @Column({ type: 'varchar', length: 500 })  
  VINPES_RESPALDO: string;  

  @Column({ type: 'integer', default: 1 })  
  VINPES_ESTADO: number;  
}