import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { InterSede } from './inter_sede.entity';

@Entity('tbl_inter_internacionalizacion')
export class Internacionalizacion {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  INTER_ID: number;

  @Column()
  @ApiProperty()
  SEDE_ID: number;

  @ManyToOne(() => InterSede)
  @JoinColumn({ name: 'SEDE_ID' })
  sede: InterSede;

  @Column()
  @ApiProperty()
  ICAR_ID: number;

  @Column()
  @ApiProperty()
  INTER_CONV_CODIGO: string;

  @Column()
  @ApiProperty()
  INTER_CONV_NOMBRE: string;

  @Column()
  @ApiProperty()
  INTER_CONTRAPARTE: string;

  @Column()
  @ApiProperty()
  PAI_ID: number;

  @Column()
  @ApiProperty()
  PTIP_ID: number;

  @Column()
  @ApiProperty()
  INTER_PAPELLIDO: string;

  @Column()
  @ApiProperty()
  INTER_PNOMBRE: string;

  @Column()
  @ApiProperty()
  INTER_ACTIVIDADES: string;

  @Column()
  @ApiProperty()
  INTER_FINICIO: string;

  @Column()
  @ApiProperty()
  INTER_FFIN: string;

  @Column()
  @ApiProperty()
  ARE_ID: number;

  @Column()
  @ApiProperty()
  FIN_ID: number;

  @Column()
  @ApiProperty()
  INTER_ADOCENCIA: string;

  @Column()
  @ApiProperty()
  INTER_AINVESTIGACION: string;

  @Column()
  @ApiProperty()
  INTER_AVINCULACION: string;

  @Column()
  @ApiProperty()
  INTER_AADMINISTRATIVO: string;

  @Column()
  @ApiProperty()
  INTER_AINTERNACIONALIZACION: string;

  @Column()
  @ApiProperty()
  INTER_INDICADOR_1: string;

  @Column()
  @ApiProperty()
  INTER_INDICADOR_2: string;

  @Column()
  @ApiProperty()
  INTER_INDICADOR_3: string;

  @Column()
  @ApiProperty()
  INTER_INDICADOR_4: string;

  @Column()
  @ApiProperty()
  INTER_INDICADOR_5: string;

  @Column()
  @ApiProperty()
  INTER_INDICADOR_6: string;

  @Column()
  @ApiProperty()
  INTER_INDICADOR_7: string;

  @Column()
  @ApiProperty()
  INTER_INDICADOR_8: string;

  @Column()
  @ApiProperty()
  INTER_INDICADOR_9: string;

  @Column()
  @ApiProperty()
  INTER_EVIDENCIA: string;

  @Column()
  @ApiProperty()
  INTER_ESTADO: number;
}
