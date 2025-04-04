import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_gac_unidades_acad_admin')
export class UnidadAcademicaAdmin {
  @PrimaryGeneratedColumn({ name: 'GUAA_ID' })
  id: number;

  @Column({ name: 'GAEO_ID' })
  estructuraOrganizacionalId: number;

  @Column({ name: 'GUAA_NOMBRE' })
  nombre: string;

  @Column({ name: 'GUAA_RESPONSABLE' })
  responsable: string;

  @Column({ name: 'GUAA_ORDEN' })
  orden: number;

  @Column({ name: 'GUAA_ESTADO' })
  estado: number;
}
