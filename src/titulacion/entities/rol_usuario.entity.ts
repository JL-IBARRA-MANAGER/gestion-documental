import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_rol_usuario')
export class RolUsuario {
  @PrimaryGeneratedColumn()
  ROLU_ID: number;

  @Column()
  ROL_ID: number;

  @Column()
  USU_ID: number;

  @Column()
  ROLU_ESTADO: number;
}
