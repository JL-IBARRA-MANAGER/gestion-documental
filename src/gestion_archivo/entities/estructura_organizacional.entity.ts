import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_gac_estructura_organizacional')
export class EstructuraOrganizacional {
  @PrimaryGeneratedColumn({ name: 'GAEO_ID' })
  id: number;

  @Column({ name: 'GAEO_NOMBRE' })
  nombre: string;
}
