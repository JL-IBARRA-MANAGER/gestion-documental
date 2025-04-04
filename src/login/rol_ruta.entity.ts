import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_rol_ruta')
export class RolRuta {
  @PrimaryGeneratedColumn()
  ROLR_ID: number;

  @Column()
  ROL_ID: number;

  @Column()
  RUT_ID: number;

  @Column()
  ROLR_ELIMINADO: number;
}
