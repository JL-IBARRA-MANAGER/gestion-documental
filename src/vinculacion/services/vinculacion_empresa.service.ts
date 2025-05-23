import { Injectable, HttpException, HttpStatus } from '@nestjs/common';  
import { InjectRepository } from '@nestjs/typeorm';  
import { Repository } from 'typeorm';  
import { VinculacionEmpresas } from '../entities/vinculacion_empresas.entity';  
import { VinculacionEmpresaTipo } from '../entities/vinculacion_empresa_tipo.entity';  
import { UpdateVinculacionEmpresaDto } from '../dtos/update-vinculacion-empresa.dto';  
import { CreateVinculacionEmpresaDto } from '../dtos/create-vinculacion-empresa.dto';  

@Injectable()  
export class VinculacionEmpresaService {  
  constructor(  
    @InjectRepository(VinculacionEmpresas)  
    private vinculacionEmpresasRepository: Repository<VinculacionEmpresas>,  
    @InjectRepository(VinculacionEmpresaTipo)  
    private vinculacionEmpresaTipoRepository: Repository<VinculacionEmpresaTipo>,  
  ) {}  

  async getEmpresaVinculadaById(VINE_ID: number): Promise<any> {  
      const result = await this.vinculacionEmpresasRepository.query(`  
          SELECT   
          ve."VINE_ID",   
          ve."VINE_NOMBRE",   
          ve."VINE_TELEFONO",   
          ve."VINE_CORREO",   
          ve."VINE_CONTACTO",  
          ve."VINE_IDENTIFICACION",  
          ve."VINET_ID",  
          vet."VINET_NOMBRE",  
          ve."VINE_SECTOR_ECONOMICO" as "VINE_SECTOR_ECONOMICO_ID",   
          CASE  
              WHEN ve."VINE_SECTOR_ECONOMICO" = 1 THEN 'PRIMARIO'  
              WHEN ve."VINE_SECTOR_ECONOMICO" = 2 THEN 'SECUNDARIO'  
              WHEN ve."VINE_SECTOR_ECONOMICO" = 3 THEN 'TERCIARIO'  
              ELSE 'OTRO'  
          END as "VINE_SECTOR_ECONOMICO_TEXTUAL",  
          ve."VINE_CODIGO_BANNER",  
          ve."VINE_ID_PARROQUIA",  
          ve."VINE_DIRECCION",  
          COALESCE(ve."VINE_DESCRIPCION", '') as "VINE_DESCRIPCION"  
          FROM   
          public."tbl_vinculacion_empresas" ve  
          JOIN   
          public."tbl_vinculacion_empresa_tipo" vet   
          ON   
          ve."VINET_ID" = vet."VINET_ID"  
          WHERE   
          ve."VINE_ID" = $1  
      `, [VINE_ID]);  
      
      if (!result || result.length === 0) {  
        throw new HttpException('Empresa no encontrada', HttpStatus.NOT_FOUND);  
      }  
      return result[0];  
  }  
 

  async vincularEmpresa(createDto: CreateVinculacionEmpresaDto): Promise<any> {  
    return this.vinculacionEmpresasRepository.query(  
        `  
        INSERT INTO public.tbl_vinculacion_empresas (  
        "VINE_NOMBRE",   
        "VINE_TELEFONO",   
        "VINE_CORREO",   
        "VINE_CONTACTO",    
        "VINE_IDENTIFICACION",  
        "VINET_ID",   
        "VINE_SECTOR_ECONOMICO",  
        "VINE_CODIGO_BANNER",  
        "VINE_ID_PARROQUIA",  
        "VINE_DIRECCION",  
        "VINE_DESCRIPCION",  
        "VINE_ESTADO"   
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 1)  
        RETURNING "VINE_ID"  
        `,  
        [  
        createDto.VINE_NOMBRE ?? null,  
        createDto.VINE_TELEFONO ?? null,  
        createDto.VINE_CORREO ?? null,  
        createDto.VINE_CONTACTO ?? null,  
        createDto.VINE_IDENTIFICACION ?? null,  
        createDto.VINET_ID ?? null,  
        createDto.VINE_SECTOR_ECONOMICO ?? null,  
        createDto.VINE_CODIGO_BANNER ?? null,  
        createDto.VINE_ID_PARROQUIA ?? null,  
        createDto.VINE_DIRECCION ?? null,  
        createDto.VINE_DESCRIPCION ?? ''  
        ],  
    );  
  }  

  async getTipoEmpresa(): Promise<any[]> {  
    return this.vinculacionEmpresaTipoRepository.query(`  
      SELECT "VINET_ID", "VINET_NOMBRE"  
      FROM public.tbl_vinculacion_empresa_tipo  
      WHERE "VINET_ESTADO" = 1  
    `);  
  }  

  async actualizarEstado(id: number, estado: number): Promise<any> {  
    const result = await this.vinculacionEmpresasRepository.query(  
      `UPDATE public."tbl_vinculacion_empresas"  
      SET "VINE_ESTADO" = $1  
      WHERE "VINE_ID" = $2  
      RETURNING "VINE_ID"`,  
      [estado, id],  
    );  

    if (!result || result.length === 0) {  
      throw new HttpException('No se encontró la empresa o no se realizaron cambios', HttpStatus.BAD_REQUEST);  
    }  

    return { message: 'Estado actualizado exitosamente', id: result[0].VINE_ID };  
  }  

  async updateEmpresaVinculada(updateDto: UpdateVinculacionEmpresaDto): Promise<any> {  
    const updates = [];  
    const values = [];  

    if (updateDto.VINE_NOMBRE !== undefined) {  
      updates.push(`"VINE_NOMBRE" = $${updates.length + 1}`);  
      values.push(updateDto.VINE_NOMBRE);  
    }  
    if (updateDto.VINE_TELEFONO !== undefined) {  
      updates.push(`"VINE_TELEFONO" = $${updates.length + 1}`);  
      values.push(updateDto.VINE_TELEFONO);  
    }  
    if (updateDto.VINE_CORREO !== undefined) {  
      updates.push(`"VINE_CORREO" = $${updates.length + 1}`);  
      values.push(updateDto.VINE_CORREO);  
    }  
    if (updateDto.VINE_CONTACTO !== undefined) {  
      updates.push(`"VINE_CONTACTO" = $${updates.length + 1}`);  
      values.push(updateDto.VINE_CONTACTO);  
    }  
    if (updateDto.VINE_IDENTIFICACION !== undefined) {  
      updates.push(`"VINE_IDENTIFICACION" = $${updates.length + 1}`);  
      values.push(updateDto.VINE_IDENTIFICACION);  
    }  
    if (updateDto.VINET_ID !== undefined) {  
      updates.push(`"VINET_ID" = $${updates.length + 1}`);  
      values.push(updateDto.VINET_ID);  
    }  
    if (updateDto.VINE_SECTOR_ECONOMICO !== undefined) {  
      updates.push(`"VINE_SECTOR_ECONOMICO" = $${updates.length + 1}`);  
      values.push(updateDto.VINE_SECTOR_ECONOMICO);  
    }  
    if (updateDto.VINE_CODIGO_BANNER !== undefined) {  
      updates.push(`"VINE_CODIGO_BANNER" = $${updates.length + 1}`);  
      values.push(updateDto.VINE_CODIGO_BANNER);  
    }  
    if (updateDto.VINE_ID_PARROQUIA !== undefined) {  
      updates.push(`"VINE_ID_PARROQUIA" = $${updates.length + 1}`);  
      values.push(updateDto.VINE_ID_PARROQUIA);  
    }  
    if (updateDto.VINE_DIRECCION !== undefined) {  
      updates.push(`"VINE_DIRECCION" = $${updates.length + 1}`);  
      values.push(updateDto.VINE_DIRECCION);  
    }  
    if (updateDto.VINE_DESCRIPCION !== undefined) {  
      updates.push(`"VINE_DESCRIPCION" = $${updates.length + 1}`);  
      values.push(updateDto.VINE_DESCRIPCION);  
    }  

    if (updates.length === 0) {  
      throw new HttpException('No fields to update', HttpStatus.BAD_REQUEST);  
    }  

    values.push(updateDto.VINE_ID);  

    const query = `  
      UPDATE public."tbl_vinculacion_empresas"  
      SET ${updates.join(', ')}  
      WHERE "VINE_ID" = $${values.length}  
      RETURNING "VINE_ID"  
    `;  

    const result = await this.vinculacionEmpresasRepository.query(query, values);  

    if (!result || result.length === 0) {  
      throw new HttpException('No se encontró la empresa o no se realizaron cambios', HttpStatus.BAD_REQUEST);  
    }  

    return { message: 'Empresa actualizada exitosamente', id: result[0].VINE_ID };  
  }  


  // En vinculacion_empresa.service.ts  

    // En vinculacion_empresa.service.ts  




  async getEmpresasVinculadas(): Promise<any[]> {  
      return this.vinculacionEmpresasRepository.query(`  
                SELECT   
                ve."VINE_ID",   
                ve."VINE_NOMBRE",   
                ve."VINE_TELEFONO",   
                ve."VINE_CORREO",   
                ve."VINE_CONTACTO",  
                ve."VINE_IDENTIFICACION",  
                ve."VINET_ID",  
                vet."VINET_NOMBRE",  
                ve."VINE_SECTOR_ECONOMICO" as "VINE_SECTOR_ECONOMICO_ID",   
                CASE  
                    WHEN ve."VINE_SECTOR_ECONOMICO" = 1 THEN 'PRIMARIO'  
                    WHEN ve."VINE_SECTOR_ECONOMICO" = 2 THEN 'SECUNDARIO'  
                    WHEN ve."VINE_SECTOR_ECONOMICO" = 3 THEN 'TERCIARIO'  
                    ELSE 'OTRO'  
                END as "VINE_SECTOR_ECONOMICO_TEXTUAL",  
                ve."VINE_CODIGO_BANNER",  
                -- Agregamos la información de ubicación geográfica  
                p.id as "ID_PARROQUIA",  
                p.parroquia as "PARROQUIA",  
                c.id as "ID_CANTON",  
                c.canton as "CANTÓN",  
                pr.id as "ID_PROVINCIA",  
                pr.provincia as "PROVINCIA",  
                ve."VINE_ID_PARROQUIA",  
                ve."VINE_DIRECCION",  
                ve."VINE_DESCRIPCION"  
                FROM   
                public."tbl_vinculacion_empresas" ve  
                JOIN public."tbl_vinculacion_empresa_tipo" vet ON ve."VINET_ID" = vet."VINET_ID"  
                -- JOIN para parroquia  
                LEFT JOIN public.tbl_global_parroquia p ON ve."VINE_ID_PARROQUIA" = p.id  
                -- JOIN para cantón  
                LEFT JOIN public.tbl_global_canton c ON p.id_canton = c.id  
                -- JOIN para provincia  
                LEFT JOIN public.tbl_global_provincia pr ON c.id_provincia = pr.id  
                WHERE   
                ve."VINE_ESTADO" = 1  
                ORDER BY   
                ve."VINE_NOMBRE" ASC;        `);  
  }    

}  