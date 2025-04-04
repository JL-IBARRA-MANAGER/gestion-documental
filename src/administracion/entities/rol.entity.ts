import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tbl_rol')
export class Rol {
  @PrimaryGeneratedColumn({ name: 'ROL_ID' })
  @ApiProperty({ example: 1 })
  ROL_ID: number;

  @Column({ name: 'ROL_NOBRE' })
  @ApiProperty({ example: 'Administrador' })
  ROL_NOBRE: string;;

  @Column({ name: 'ROL_EDITAR' })
  @ApiProperty({ example: true })
  ROL_EDITAR: boolean;

  @Column({ name: 'ROL_ESTADO' })
  ROL_ESTADO: boolean;
}
