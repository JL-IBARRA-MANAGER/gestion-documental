import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_rutas')
export class Ruta {
  @PrimaryGeneratedColumn()
  RUT_ID: number;

  @Column()
  RUT_NOMBRE: string;

  @Column()
  RUT_RUTA: string;

  @Column()
  RUT_PADRE: number;

  @Column()
  RUT_PATH_URL: string;

  @Column()
  RUT_IMPORT_COMPONENT: string;

  @Column()
  RUT_INDEXEDDB: number;

  @Column()
  RUT_ESTADO: number;

}
