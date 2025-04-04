import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tbl_inter_tipo_participante')
export class InterTipoParticipante {
  @PrimaryGeneratedColumn()
  PTIP_ID: number;

  @ApiProperty()
  @Column()
  PTIP_TIPO: string;

  @ApiProperty()
  @Column()
  PTIP_ESTADO: number;
}
