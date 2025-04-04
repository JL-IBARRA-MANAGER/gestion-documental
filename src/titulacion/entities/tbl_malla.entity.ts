import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_titulacion_malla')
export class Malla {
  @PrimaryGeneratedColumn({ name: 'MALLA_ID' })
  id: number;

  @Column({ name: 'MALLA_NOMBRE' })
  nombre: string;

  @Column({ name: 'MALLA_ESTADO' })
  estado: number;
}
