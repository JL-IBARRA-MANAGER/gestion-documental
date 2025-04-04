import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  USU_ID: number;

  @Column()
  USU_NOMBRE: string;

  @Column()
  USU_APELLIDO: string;

  @Column()
  USU_USUARIO: string;

  @Column()
  USU_CONTRASENA: string;

  @Column()
  USU_FECHA: Date;

  @Column()
  USU_ESTADO: number;
}
