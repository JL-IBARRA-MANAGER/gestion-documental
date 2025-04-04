import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_usuario_carrera_privilegios')
export class UsuarioCarreraPrivilegios {
  @PrimaryGeneratedColumn()
  USUCP_ID: number;

  @Column()
  USU_ID: number;

  @Column()
  CAR_ID: number;

  @Column()
  USUCP_TITULACION: number;

  @Column()
  USUCP_EDITAR: number;

  @Column({ default: 1 })
  USUCP_ESTADO: number;
}
