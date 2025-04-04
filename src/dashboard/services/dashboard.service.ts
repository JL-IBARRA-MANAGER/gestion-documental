import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrera } from '../../biblioteca/entities/carrera.entity';
import { MatrizGraduados } from '../../administracion/entities/matriz_graduados.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Carrera) private carreraRepository: Repository<Carrera>,
    @InjectRepository(MatrizGraduados) private matrizGraduadosRepository: Repository<MatrizGraduados>,
  ) {}

  async getTotalGraduados() {
    // Consulta para contar el total de registros en tbl_matriz_graduados
    const result = await this.matrizGraduadosRepository.query(`
      SELECT COUNT("MAGR_ID") AS total_graduados
      FROM public."tbl_matriz_graduados";
    `);

    // Obtener el número total y concatenar con el mensaje
    const totalGraduados = result[0]?.total_graduados || 0;
    return {
      title: `ALUMNI EN CIFRAS:`,
      message: `Desde 1976, nos hemos graduado ${totalGraduados} personas.`,
    };
  }

  async getGraduadosPorEscuelas() {
    return this.matrizGraduadosRepository.query(`
      SELECT 
          escuela."CAR_NOMBRE" AS "Escuela", 
          COUNT(matriz."MAGR_ID") AS "Graduados"
      FROM 
          public."tbl_matriz_graduados" matriz
      INNER JOIN 
          public."tbl_carrera" carrera ON carrera."CAR_ID" = matriz."CAR_ID"
      INNER JOIN 
          public."tbl_carrera" escuela ON escuela."CAR_ID" = carrera."CAR_PADREESC" AND escuela."CAR_ESCUELA" = 1
      GROUP BY 
          escuela."CAR_NOMBRE"
      ORDER BY 
          escuela."CAR_NOMBRE" ASC;
    `);
  }

  async getGraduadosPorCarrera() {
    return this.carreraRepository.query(`
      SELECT 
          c."CAR_PADREESC",
          CASE
              WHEN c."CAR_PADREESC" = 0 THEN c."CAR_NOMBRE"
              ELSE p."CAR_NOMBRE"
          END AS "ESCUELA",
          ct."CTIP_NOMBRE" AS "GRADO ACADÉMICO",
          c."CAR_NOMBRE" AS "CARRERA",
          c."CAR_CARRERA",
          c."CAR_ACTIVA" AS "ACTIVA",
          COUNT(g."MAGR_ID") AS "GRADUADOS"
      FROM 
          public."tbl_carrera" c
      LEFT JOIN 
          public."tbl_carrera" p ON c."CAR_PADREESC" = p."CAR_ID"
      LEFT JOIN 
          public."tbl_matriz_graduados" g ON c."CAR_ID" = g."CAR_ID"
      LEFT JOIN 
          public."tbl_carrera_tipo" ct ON c."CTIP_ID" = ct."CTIP_ID"
      GROUP BY 
          c."CAR_PADREESC", c."CAR_ID", c."CTIP_ID", p."CAR_NOMBRE", ct."CTIP_NOMBRE"
      HAVING 
          COUNT(g."MAGR_ID") != 0
      ORDER BY 
          "ESCUELA" ASC, 
          CASE 
              WHEN c."CAR_ACTIVA" = 'SÍ' THEN 1
              WHEN c."CAR_ACTIVA" = 'No' THEN 2
              ELSE 3
          END ASC,
          c."CTIP_ID" DESC, 
          "CARRERA" ASC;
    `);
  }

  async getTotalGraduadosHombres() {
    const result = await this.matrizGraduadosRepository.query(`
      SELECT COUNT("MAGR_ID") AS total_hombres
      FROM public."tbl_matriz_graduados"
      WHERE LOWER("MAGR_SEXO") LIKE 'm%';
    `);
    return { totalHombres: result[0]?.total_hombres || 0 };
  }

  
  async getTotalGraduadasMujeres() {
    const result = await this.matrizGraduadosRepository.query(`
      SELECT COUNT("MAGR_ID") AS total_mujeres
      FROM public."tbl_matriz_graduados"
      WHERE LOWER("MAGR_SEXO") LIKE 'f%';
    `);
    return { totalMujeres: result[0]?.total_mujeres || 0 };
  }


  async getTotalGraduadosSinSexo() {
    const result = await this.matrizGraduadosRepository.query(`
      SELECT COUNT("MAGR_ID") AS total_sin_sexo
      FROM public."tbl_matriz_graduados"
      WHERE "MAGR_SEXO" = '' OR "MAGR_SEXO" IS NULL;
    `);
    return { totalSinSexo: result[0]?.total_sin_sexo || 0 };
  }

}
