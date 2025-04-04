import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tbl_inter_areacon_especifico')
export class InterAreaconEspecifico {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  AESP_ID: number;

  @ApiProperty()
  @Column()
  AESP_CODIGO: string;

  @ApiProperty()
  @Column()
  AESP_DESCRIPCION: string;

  @ApiProperty()
  @Column()
  AESP_ESTADO: number;
}
