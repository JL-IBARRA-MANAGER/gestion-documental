import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tbl_inter_area_conocimiento')
export class InterAreaConocimiento {
  @PrimaryGeneratedColumn()
  ARE_ID: number;

  @ApiProperty()
  @Column()
  AESP_ID: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 45 })
  ARE_CODIGO: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  ARE_DESCRIPCION: string;

  @ApiProperty()
  @Column()
  ARE_ESTADO: number;
}
