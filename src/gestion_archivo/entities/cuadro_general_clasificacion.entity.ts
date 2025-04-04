import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_gac_cuadro_general_clasificacion')
export class CuadroGeneralClasificacion {
  @PrimaryGeneratedColumn({ name: 'CGCD_ID' })
  id: number;

  @Column({ name: 'GSUA_ID' })
  subUnidadAcademicaAdminId: number;

  @Column({ name: 'CGCD_SERIE_DOCUMENTAL' })
  serieDocumental: string;

  @Column({ name: 'CGCD_SUBSERIE_DOCUMENTAL' })
  subserieDocumental: string;

  @Column({ name: 'CGCD_DESCRIPCION_SERIE' })
  descripcionSerie: string;

  @Column({ name: 'CGCD_ORIGEN_DOCUMENTACION' })
  origenDocumentacion: number;

  @Column({ name: 'CGCD_CONDICIONES_ACCESO' })
  condicionesAcceso: number;

  @Column({ name: 'CGCD_NUM_EXPEDIENTES' })
  numExpedientes: number;

  @Column({ name: 'USU_ID' })
  usuarioId: number;

  @Column({ name: 'CGCD_ESTADO' })
  estado: number;
}
