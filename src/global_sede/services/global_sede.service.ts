// src/global_sede/services/global_sede.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlobalSede } from '../entities/global_sede.entity';
import { UpdateSedeNombreDto } from '../dtos/update-sede-nombre.dto';
import { UpdateSedeEstadoDto } from '../dtos/update-sede-estado.dto';

@Injectable()
export class GlobalSedeService {
  constructor(
    @InjectRepository(GlobalSede)
    private readonly globalSedeRepository: Repository<GlobalSede>,
  ) {}

  async findActiveSedes(): Promise<GlobalSede[]> {
    return this.globalSedeRepository.query(`
      SELECT 
      	"SEDE_ID" AS "Id", 
      	"SEDE_NOMBRE" AS "Nombre"

      FROM 
	public."tbl_global_sede"
      WHERE 
	"SEDE_ESTADO" = 1
    `);
  }


  async updateSedeNombre(id: number, updateSedeNombreDto: UpdateSedeNombreDto) {
    return this.globalSedeRepository.query(`
      UPDATE public."tbl_global_sede"
      SET "SEDE_NOMBRE" = $1
      WHERE "SEDE_ID" = $2
    `, [updateSedeNombreDto.SEDE_NOMBRE, id]);
  }


  async updateSedeEstado(id: number, updateSedeEstadoDto: UpdateSedeEstadoDto) {
    return this.globalSedeRepository.query(`
      UPDATE public."tbl_global_sede"
      SET "SEDE_ESTADO" = $1
      WHERE "SEDE_ID" = $2
    `, [updateSedeEstadoDto.SEDE_ESTADO, id]);
  }


  async findAllProvincias(): Promise<{Id: number, Provincia: string}[]> {  
    return this.globalSedeRepository.query(`  
      SELECT   
        id AS "Id",   
        provincia AS "Provincia"  
      FROM   
        public.tbl_global_provincia  
    `);  
  } 

  async findCantonByProvincia(id_provincia: number): Promise<{Id: number, Canton: string, IdProvincia: number}[]> {  
    return this.globalSedeRepository.query(`  
      SELECT   
        id AS "Id",   
        canton AS "Canton",  
        id_provincia AS "IdProvincia"  
      FROM   
        public.tbl_global_canton  
      WHERE   
        id_provincia = $1  
    `, [id_provincia]);  
  } 

  async findParroquiasByCanton(id_canton: number): Promise<{Id: number, Parroquia: string, IdCanton: number}[]> {  
    return this.globalSedeRepository.query(`  
      SELECT   
        id AS "Id",   
        parroquia AS "Parroquia",  
        id_canton AS "IdCanton"  
      FROM   
        public.tbl_global_parroquia  
      WHERE   
        id_canton = $1  
    `, [id_canton]);  
  }



}
