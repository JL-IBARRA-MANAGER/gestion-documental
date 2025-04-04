import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_aprehenser_desarrollo')
export class AprehenserDesarrollo {
  @PrimaryGeneratedColumn()
  DES_ID: number;

  @Column({ type: 'varchar', length: 255 })
  DES_NOMBRE: string;

  @Column({ type: 'text' })
  DES_TEXTO: string;

  @Column({ type: 'int' })
  DES_ESTADO: number;
}