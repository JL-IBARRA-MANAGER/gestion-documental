import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_rol')
export class Rol {
  @PrimaryGeneratedColumn()
  ROL_ID: number;

  @Column()
  ROL_NOBRE: string;

  @Column()
  ROL_EDITAR: string;
}
