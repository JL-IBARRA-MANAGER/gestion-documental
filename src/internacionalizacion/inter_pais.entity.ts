import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tbl_global_pais')
export class InterPais {
  @PrimaryGeneratedColumn()
  PAI_ID: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 45 })
  PAI_PAIS: string;

  @ApiProperty()
  @Column()
  PAI_ESTADO: number;
}
