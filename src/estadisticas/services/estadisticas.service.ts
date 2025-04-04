// src/estadisticas/services/estadisticas.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estadistica } from '../entities/estadistica.entity';

@Injectable()
export class EstadisticasService {
  constructor(
    @InjectRepository(Estadistica)
    private readonly estadisticaRepository: Repository<Estadistica>,
  ) {}

  async obtenerEstadisticas(fechaInicio: string, fechaFin: string) {
    const query = `
      SELECT 
         g."MAGR_INSTITUCION" AS "CÓDIGO IES", 
         g."MAGR_CODDIGO_CARRERA" AS "CÓDIGO", 
         c."CAR_NOMBRE" AS "CARRERA", 
         g."MAGR_LUGAR" AS "IBARRA", 
	 g."MAGR_FECHA_INICIO_ESTUDIOS" AS "FECHA INICIO DE ESTUDIOS",
	 g."MAGR_FECHA_ACTA_GRADO" AS "FECHA ACTA DE GRADO", 
	 g."MAGR_TIPO_DE_COLEGIO" AS "TIPO COLEGIO", 
	 g."MAGR_PROCEDENCIA_TITULO_ADMISION" AS "TIPO COLEGIO", 
	 g."MAGR_MECANISMO_TITULACION" AS "MECANISMO",  
	 g."MAGR_TEMA_DE_TESIS" AS "TEMA", 
         g."MAGR_ETNIA" AS "ETNIA", 
	 g."MAGR_SEXO" AS "SEXO",  
         g."MAGR_MAIL" AS "EMAIL", 
	 g."MAGR_TELEFONO" AS "TELÉFONO", 
	 g."MAGR_TIPO_IDENTIFICACION" AS "IDENTIFICACIÓN", 
	 g."MAGR_CEDULA" AS "CÉDULA", 
	 g."MAGR_NOMBRES" AS "NOMBRE", 
	 g."MAGR_NOTA_FINAL" AS "NOTA" 
      FROM 
        public.tbl_matriz_graduados g
      JOIN 
        public.tbl_carrera c ON g."CAR_ID" = c."CAR_ID"
      WHERE 
        g."MAGR_FECHA_EGRESAMIENTO" BETWEEN $1 AND $2
    `;

    return this.estadisticaRepository.query(query, [fechaInicio, fechaFin]);
  }
}
