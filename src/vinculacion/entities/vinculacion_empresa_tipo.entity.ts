import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tbl_vinculacion_empresa_tipo')
export class VinculacionEmpresaTipo {
  @PrimaryGeneratedColumn({ name: 'VINET_ID' })
  VINET_ID: number;

  @Column({ name: 'VINET_NOMBRE' })
  VINET_NOMBRE: string;

  @Column({ name: 'VINET_ESTADO' })
  VINET_ESTADO: number;
}
