import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tbl_inter_nivel')
export class InterNivel {
  @PrimaryGeneratedColumn()
  NIV_ID: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 45 })
  NIV_NIVEL: string;

  @ApiProperty()
  @Column()
  NIV_ESTADO: number;
}
