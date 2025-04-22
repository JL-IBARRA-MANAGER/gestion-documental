import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_vinculacion_empresas')
export class VinculacionEmpresas {
  @PrimaryGeneratedColumn({ name: 'VINE_ID' })
  id: number;

  @Column({ name: 'VINE_NOMBRE' })
  nombre: string;

  @Column({ name: 'VINE_TELEFONO' })
  telefono: string;

  @Column({ name: 'VINE_CORREO' })
  correo: string;

  @Column({ name: 'VINE_CONTACTO' })
  contacto: string;

  @Column({ name: 'VINE_IDENTIFICACION' })
  identificacion: string;

  @Column({ name: 'VINET_ID' })
  tipoId: number;

  @Column({ name: 'VINE_SECTOR_ECONOMICO' })
  sectorEconomico: string;

  @Column({ name: 'VINE_ESTADO' })
  estado: number;

  @Column({ name: 'VINE_DESCRIPCION', nullable: true, length: 500, default: '' })  
  descripcion: string;  

}
