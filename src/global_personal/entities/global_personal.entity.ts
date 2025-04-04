import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_global_personal')
export class GlobalPersonal {
  @PrimaryGeneratedColumn()
  LDOC_ID: number;

  @Column()
  LDOC_NOMBRE: string;

  @Column()
  LDOC_CEDULA: string;

  @Column()
  LDOC_GENERO: string;

  @Column()
  LDOC_ESTADO: number;
}
