import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tbl_inter_modalidad')
export class InterModalidad {
  @PrimaryGeneratedColumn()
  MOD_ID: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 45 })
  MOD_MODALIDAD: string;

  @ApiProperty()
  @Column()
  MOD_ESTADO: number;
}
