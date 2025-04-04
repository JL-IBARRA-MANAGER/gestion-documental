import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_expediente_tipo_tramite')
export class ExpedienteTipoTramite {
  @PrimaryGeneratedColumn()
  ESPTT_ID: number;

  @Column()
  EXPTT_NOMBRE: string;

  @Column()
  EXPTT_OBSERVACION: string;

  @Column()
  EXPTT_ESTADO: number;
}
