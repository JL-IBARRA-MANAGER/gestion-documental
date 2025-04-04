import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tbl_inter_carrera')
export class InterCarrera {
  @PrimaryGeneratedColumn()
  ICAR_ID: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 45 })
  ICAR_CODIGO: string;

  @ApiProperty()
  @Column()
  CAR_ID: number;

  @ApiProperty()
  @Column()
  MOD_ID: number;

  @ApiProperty()
  @Column()
  NIV_ID: number;

  @ApiProperty()
  @Column()
  SED_ID: number;

  @ApiProperty()
  @Column()
  ICAR_ESTADO: number;
}
