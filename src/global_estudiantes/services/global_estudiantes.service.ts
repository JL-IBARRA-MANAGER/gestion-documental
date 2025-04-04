import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlobalEstudiantes } from '../entities/global_estudiantes.entity';

@Injectable()
export class GlobalEstudiantesService {
  constructor(
    @InjectRepository(GlobalEstudiantes)
    private globalEstudiantesRepository: Repository<GlobalEstudiantes>,
  ) {}

    async findAll() {
    return this.globalEstudiantesRepository.query(`
        SELECT "IDENTIFICACION", "APELLIDOS", "NOMBRES" FROM public.tbl_global_estudiantes_distinct;
    `);
    }



  // Método para encontrar el último registro de un estudiante por IDENTIFICACION  
  async findLastByIdentificacion(identificacion: string) {  
    try {  
      const query = `  
        SELECT   
          "LEST_ID",  
          "SFRSTCR_TERM_CODE",  
          "PERIODO",  
          "CODIGO_CARRERA",  
          "NOMBRE_CARRERA",  
          "ESCUELA",  
          "CIUDAD",  
          "TIPO_IDENTIFICACION",  
          "IDENTIFICACION",  
          "APELLIDOS",  
          "NOMBRES",  
          "SEXO",  
          "ETNIA",  
          "NACIONALIDAD",  
          "EMAIL",  
          "CODIGO_ASIGNATURA",  
          "ASIGNATURA",  
          "NIVEL",  
          "SISTEMA"  
        FROM public.tbl_global_estudiantes  
        WHERE "IDENTIFICACION" = \$1  
        ORDER BY "LEST_ID" DESC  
        LIMIT 1;  
      `;  

      const result = await this.globalEstudiantesRepository.query(query, [identificacion]);  
      // Retornamos el último registro o un mensaje en caso de no encontrar resultados  
      return result.length ? result[0] : { message: 'No records found for the provided IDENTIFICACION' };  
    } catch (error) {  
      console.error('Error fetching student record by IDENTIFICACION:', error);  
      throw new Error('Internal server error');  
    }  
  }  



  async findByIdentificacion(identificacion: string) {  
    try {  
      const query = `  
        SELECT "IDENTIFICACION", "APELLIDOS", "NOMBRES"  
        FROM public.tbl_global_estudiantes_distinct  
        WHERE "IDENTIFICACION" LIKE '%' || $1 || '%'  
      `;  

      const result = await this.globalEstudiantesRepository.query(query, [identificacion]);  
      return result.length ? result : { message: 'No records found for the provided IDENTIFICACION' };  
    } catch (error) {  
      console.error('Error fetching students by IDENTIFICACION:', error);  
      throw new Error('Internal server error');  
    }  
  }  


}
