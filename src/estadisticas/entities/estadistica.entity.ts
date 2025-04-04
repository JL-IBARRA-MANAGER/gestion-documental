// src/estadisticas/entities/estadistica.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_matriz_graduados')
export class Estadistica {
  @PrimaryGeneratedColumn()
  MAGR_ID: number;

  @Column()
  MAGR_NUMERO: number;

  // Agrega el resto de las columnas según sea necesario
  @Column()
  MAGR_CODDIGO_CARRERA: string;

  // ... Continúa con el resto de los campos ...
}
