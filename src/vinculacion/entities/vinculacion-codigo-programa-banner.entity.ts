import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';  

@Entity('tbl_vinculacion_codigo_programa_banner', { schema: 'public' })  
export class VinculacionCodigoProgramaBanner {  
  @PrimaryGeneratedColumn({ name: 'VCPB_ID' })  
  id: number;  

  @Column({ name: 'VCPB_CODIGO', type: 'varchar' })  
  codigo: string;  

  @Column({ name: 'CAR_ID', type: 'int' })  
  carId: number;  

  @Column({ name: 'VCPB_NOMBRE', type: 'varchar' })  
  nombre: string;  

  @Column({ name: 'VCPB_TIPO', type: 'int' })  
  tipo: number;  

  @Column({ name: 'VCPB_ESTADO', type: 'int', default: 1 })  
  estado: number;  
}