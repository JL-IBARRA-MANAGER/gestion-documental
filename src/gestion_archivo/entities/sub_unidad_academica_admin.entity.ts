import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_gac_sub_unidades_acad_admin')
export class SubUnidadAcademicaAdmin {
  @PrimaryGeneratedColumn({ name: 'GSUA_ID' })
  id: number;

  @Column({ name: 'GUAA_ID' })
  unidadAcademicaAdminId: number;

  @Column({ name: 'GSUA_NOMBRE' })
  nombre: string;

  @Column({ name: 'GSUA_RESPONSABLE' })
  responsable: string;

  @Column({ name: 'GSUA_ORDEN' })
  orden: number;

  @Column({ name: 'GSUA_ESTADO' })
  estado: number;
}
