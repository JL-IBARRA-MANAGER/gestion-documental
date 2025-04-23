// src/vinculacion/entities/vinculacion_practica.entity.ts  
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';  

@Entity('tbl_vinculacion_practica')  
export class VinculacionPractica {  
  @PrimaryGeneratedColumn()  
  VINP_ID: number;  

  @Column()  
  VINPT_ID: number;  

  @Column()  
  VINESP_ID: number;  

  @Column()  
  VINE_ID: number;  

  @Column({ type: 'date' })  
  VINP_FECHA_INICIO: Date;  

  @Column({ type: 'date' })  
  VINP_FECHA_FIN: Date;  

  @Column({ type: 'varchar' })  
  VINP_HORAS_PRACTICAS: string;  

  @Column()  
  VINP_CAMPO_ESP: number;  

  @Column()  
  VINP_CAMPO_DET: number;  

  @Column()  
  DOC_CEDULA: string;  

  @Column()  
  SEDE_ID: number;  

  @Column()  
  VINP_ESTADO: number;  

  @Column()  
  VINP_CAMPO_AMP: number;  

  @Column()  
  PER_ID: number;  

  @Column()  
  CAR_ID: number;  

  @Column({ type: 'varchar', nullable: true, length: 500 })  
  VINP_PLAN: string;  

  @Column({ type: 'varchar', nullable: true, length: 500 })  
  VINP_RESULTADOS: string;  

  @Column({ type: 'varchar', length: 500 })  
  VINP_NOMBRE_PRACTICA: string;  

  @Column({ type: 'integer' })  
  VINP_CUPOS_PRACTICA: number; 

}