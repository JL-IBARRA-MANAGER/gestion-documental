import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tbl_inter_financiamiento')
export class InterFinanciamiento {
  @PrimaryGeneratedColumn()
  FIN_ID: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 45 })
  FIN_TIPO: string;

  @ApiProperty()
  @Column()
  FIN_ESTADO: number;
}
