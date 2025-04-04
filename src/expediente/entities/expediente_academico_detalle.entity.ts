import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_expediente_academico_detalle')
export class ExpedienteAcademicoDetalle {
  @PrimaryGeneratedColumn({ name: 'EXPAD_ID' })
  EXPAD_ID: number;

  @Column({ name: 'EXPA_ID' })
  EXPA_ID: number;

  @Column({ name: 'EXPAD_DOCUMENTO' })
  EXPAD_DOCUMENTO: string;

  @Column({ name: 'EXPAD_DETALLE' })
  EXPAD_DETALLE: string;

  @Column({ name: 'EXPA_FECHA_REGISTRO', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  EXPA_FECHA_REGISTRO: Date;
}
