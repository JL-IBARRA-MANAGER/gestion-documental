import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_global_periodos')
export class GlobalPeriodo {
  @PrimaryGeneratedColumn()
  PER_ID: number;

  @Column()
  PER_ANO: string;

  @Column()
  PER_PERIODO: string;

  @Column()
  PER_TIPO: number;

  @Column()
  PER_ESTADO: number;

  @Column()  
  PER_BANNER: string; 
}
