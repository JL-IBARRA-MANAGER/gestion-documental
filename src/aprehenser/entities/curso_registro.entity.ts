import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_aprehenser_desarrollo_curso_registro')
export class CursoRegistro {
  @PrimaryGeneratedColumn()
  REC_ID: number;

  @Column({ type: 'varchar', length: 100 })
  REC_NOMBRES: string;

  @Column({ type: 'varchar', length: 100 })
  REC_CORREO: string;

  @Column({ type: 'varchar', length: 10 })
  REC_CEDULA: string;

  @Column({ type: 'varchar', length: 15 })
  REC_TELEFONO: string;

  @Column({ type: 'int', default: 1 })
  REC_ESTADO: number;

  @Column({ type: 'int' })
  DESC_ID: number;

  // Puedes agregar más columnas si la tabla tiene más campos
}
