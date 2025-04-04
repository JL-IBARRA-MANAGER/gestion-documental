import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_actas_consejo')
export class Acta {
  @PrimaryGeneratedColumn({ name: 'ACT_ID' })
  id: number;

  @Column({ name: 'CAR_ID' })
  carreraId: number;

  @Column({ name: 'ACT_FECHA' })
  fecha: Date;

  @Column({ name: 'ACT_OBSERVACION' })
  observacion: string;

  @Column({ name: 'ACT_ORDEN' })
  orden: string;  

  @Column({ name: 'ACT_DIRECCION' })
  direccion: string;

  @Column({ name: 'ACT_CONVOCATORIA' })
  convocatoria: string;

  @Column({ name: 'ACT_TIPO' })
  tipo: number;

  @Column({ name: 'ACT_ESTADO' })
  estado: number;
}
