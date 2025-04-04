import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';


@Entity('tbl_aprehenser_categoria_convocatoria', { schema: 'public' })
export class Convocatoria {
  @PrimaryGeneratedColumn({ name: 'CONV_ID' })
  convId: number;

  @Column({ name: 'CONV_TITULO', type: 'varchar', length: 255 })
  convTitulo: string;

  @Column({ name: 'CONV_NOMBRE', type: 'varchar', length: 255 })
  convNombre: string;

  @Column({ name: 'CONV_IMAGEN', type: 'varchar', length: 255, nullable: true })
  convImagen: string;

  @Column({ name: 'CONV_REVISTA', type: 'varchar', length: 255 })
  convRevista: string;

  @Column({ name: 'CONV_TEXTO', type: 'text' })
  convTexto: string;

  @Column({ name: 'CAT_ID', type: 'int' })
  catId: number;

  @Column({ name: 'CONV_ESTADO', type: 'int' })
  convEstado: number;

  @Column({ name: 'CONV_ORDEN', type: 'int', nullable: true })
  convOrden: number;
}
