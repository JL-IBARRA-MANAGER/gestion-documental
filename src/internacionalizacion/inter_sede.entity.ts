import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tbl_global_sede')
export class InterSede {
  @PrimaryGeneratedColumn()
  SEDE_ID: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 45 })
  SEDE_NOMBRE: string;

  @ApiProperty()
  @Column()
  SEDE_ESTADO: number;
}
