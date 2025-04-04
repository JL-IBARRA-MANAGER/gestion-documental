import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_gac_dato_expediente')
export class DatoExpediente {
  @PrimaryGeneratedColumn({ name: 'GDE_ID' })
  id: number;

  @Column({ name: 'CGCD_ID' })
  cuadroGeneralClasificacionId: number;

  @Column({ name: 'GDE_NUM_EXPEDIENTE' })
  numExpediente: string;

  @Column({ name: 'GDE_FECHA_APERTURA' })
  fechaApertura: Date;

  @Column({ name: 'GDE_FECHA_CIERRE' })
  fechaCierre: Date;

  @Column({ name: 'GDE_VALOR_DOCUMENTAL' })
  valorDocumental: string;

  @Column({ name: 'GDE_CONDICIONES_ACCESO' })
  condicionesAcceso: string;

  @Column({ name: 'GDE_PLAZO_CONSERVACION' })
  plazoConservacion: string;

  @Column({ name: 'GDE_DESTINO_FINAL_CONSERVACION' })
  destinoFinalConservacion: string;

  @Column({ name: 'GDE_DESTINO_FINAL_ELIMINACION' })
  destinoFinalEliminacion: string;

  @Column({ name: 'GDE_ARCHIVO' })
  archivo: string;

  @Column({ name: 'GDE_CAJA' })
  caja: string;

  @Column({ name: 'GDE_ESTADO' })
  estado: number;
}
