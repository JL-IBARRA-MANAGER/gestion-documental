// src/administracion/entities/matriz_graduados.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_matriz_graduados')
export class MatrizGraduados {
  @PrimaryGeneratedColumn({ name: 'MAGR_ID' })
  id: number;

  @Column({ name: 'MAGR_NUMERO' })
  numero: string;

  @Column({ name: 'MAGR_CODDIGO_CARRERA' })
  codigoCarrera: string;

  @Column({ name: 'MAGR_INSTITUCION' })
  institucion: string;

  @Column({ name: 'MAGR_CARRERA' })
  carrera: string;

  @Column({ name: 'MAGR_LUGAR' })
  lugar: string;

  @Column({ name: 'MAGR_DURACION' })
  duracion: string;

  @Column({ name: 'MAGR_NIVEL' })
  nivel: string;

  @Column({ name: 'MAGR_MODALIDAD' })
  modalidad: string;

  @Column({ name: 'MAGR_NUMERO_MATRICULA' })
  numeroMatricula: string;

  @Column({ name: 'MAGR_TIPO_IDENTIFICACION' })
  tipoIdentificacion: string;

  @Column({ name: 'MAGR_CEDULA' })
  cedula: string;

  @Column({ name: 'MAGR_NOMBRES' })
  nombres: string;

  @Column({ name: 'MAGR_SEXO' })
  sexo: string;

  @Column({ name: 'MAGR_NACIONALIDAD' })
  nacionalidad: string;

  @Column({ name: 'MAGR_FECHA_INICIO_ESTUDIOS' })
  fechaInicioEstudios: Date;

  @Column({ name: 'MAGR_FECHA_EGRESAMIENTO' })
  fechaEgresamiento: Date;

  @Column({ name: 'MAGR_TITULO_ADMISION' })
  tituloAdmision: string;

  @Column({ name: 'MAGR_PROCEDENCIA_TITULO_ADMISION' })
  procedenciaTituloAdmision: string;

  @Column({ name: 'MAGR_FECHA_ACTA_GRADO' })
  fechaActaGrado: Date;

  @Column({ name: 'MAGR_NUMERO_ACTA_GRADO' })
  numeroActaGrado: string;

  @Column({ name: 'MAGR_DENOMINACION_TITULO' })
  denominacionTitulo: string;

  @Column({ name: 'MAGR_FECHA_REFRENDACION' })
  fechaRefrendacion: Date;

  @Column({ name: 'MAGR_NUMERO_REFRENDACION' })
  numeroRefrendacion: string;

  @Column({ name: 'MAGR_TEMA_DE_TESIS' })
  temaDeTesis: string;

  @Column({ name: 'MAGR_NUMERO_CEDULA_ASESORES' })
  numeroCedulaAsesores: string;

  @Column({ name: 'MAGR_ASESORES' })
  asesores: string;

  @Column({ name: 'MAGR_LECTOR1' })
  lector1: string;

  @Column({ name: 'MAGR_LECTOR2' })
  lector2: string;

  @Column({ name: 'MAGR_DIRECCIONES' })
  direcciones: string;

  @Column({ name: 'MAGR_TELEFONO' })
  telefono: string;

  @Column({ name: 'MAGR_MAIL' })
  mail: string;

  @Column({ name: 'MAGR_ETNIA' })
  etnia: string;

  @Column({ name: 'MAGR_PAIS_NACIONALIDAD' })
  paisNacionalidad: string;

  @Column({ name: 'MAGR_PAIS_RESIDENCIA' })
  paisResidencia: string;

  @Column({ name: 'MAGR_PROVINCIA_RECIDENCIA' })
  provinciaResidencia: string;

  @Column({ name: 'MAGR_CANTON_RESIDENCIA' })
  cantonResidencia: string;

  @Column({ name: 'MAGR_TIPO_DE_COLEGIO' })
  tipoDeColegio: string;

  @Column({ name: 'MAGR_ESTUDIOS_PREVIOS' })
  estudiosPrevios: string;

  @Column({ name: 'MAGR_UNIVERSIDAD_ESTUDIOS_PREVIOS' })
  universidadEstudiosPrevios: string;

  @Column({ name: 'MAGR_CARRERA_ESTUDIOS_PREVIOS' })
  carreraEstudiosPrevios: string;

  @Column({ name: 'MAGR_TIEMPO_ESTUDIOS_RECONOCIMIENTO' })
  tiempoEstudiosReconocimiento: string;

  @Column({ name: 'MAGR_TIPO_RECONOCIMIENTO' })
  tipoReconocimiento: string;

  @Column({ name: 'MAGR_MECANISMO_TITULACION' })
  mecanismoTitulacion: string;

  @Column({ name: 'MAGR_NOTA_PROMEDIO_ACUMULADO' })
  notaPromedioAcumulado: string;

  @Column({ name: 'MAGR_NOTA_TRABAJO_TITULACION' })
  notaTrabajoTitulacion: string;

  @Column({ name: 'MAGR_NOTA_FINAL' })
  notaFinal: string;

  @Column({ name: 'MAGR_RESPALDOS' })
  respaldos: string;

  @Column({ name: 'MAGR_EXPEDIENTE' })
  expediente: string;

  @Column({ name: 'MAGR_OBSERVACION' })
  observacion: string;

  @Column({ name: 'CAR_ID' })
  carId: number;

  @Column({ name: 'MAGR_ANALISIS' })
  analisis: string;

  // No incluir la columna MAGR_LOG en el entity
}
