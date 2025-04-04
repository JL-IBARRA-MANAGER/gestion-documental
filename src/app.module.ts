// src/app.module.ts
import { Module } from '@nestjs/common';



import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './login/login.module';
import { InternacionalizacionModule } from './internacionalizacion/internacionalizacion.module';
import { BibliotecaModule } from './biblioteca/biblioteca.module';
import { GlobalPersonalModule } from './global_personal/global_personal.module';
import { GlobalEstudiantesModule } from './global_estudiantes/global_estudiantes.module';
import { GlobalSedeModule } from './global_sede/global_sede.module';
import { PeriodosModule } from './periodos/periodos.module'; 
import { TitulacionModule } from './titulacion/titulacion.module';
import { AlumniModule } from './alumni/alumni.module';
import { ExpedienteModule } from './expediente/expediente.module';
import { AdministracionModule } from './administracion/administracion.module';
import { ActasModule } from './actas/actas.module';
import { GestionArchivoModule } from './gestion_archivo/gestion_archivo.module'; 

import { Acta } from './actas/entities/acta.entity';
import { Carrera } from './biblioteca/entities/carrera.entity';
import { ExpedienteAcademico } from './expediente/entities/expediente_academico.entity';
import { ExpedienteTipoTramite } from './expediente/entities/expediente_tipo_tramite.entity';
import { ExpedienteAcademicoDetalle } from './expediente/entities/expediente_academico_detalle.entity';

import { GlobalDominios } from './biblioteca/entities/global_dominios.entity';
import { GlobalPersonal } from './global_personal/entities/global_personal.entity';
import { GlobalEstudiantes } from './global_estudiantes/entities/global_estudiantes.entity';
import { GlobalPeriodo } from './periodos/entities/global-periodo.entity';
import { GlobalSede } from './global_sede/entities/global_sede.entity';
import { Internacionalizacion } from './internacionalizacion/internacionalizacion.entity';
import { InterAreaConocimiento } from './internacionalizacion/inter_area_conocimiento.entity';
import { InterAreaconEspecifico } from './internacionalizacion/inter_areacon_especifico.entity';
import { InterCarrera } from './internacionalizacion/inter_carrera.entity';
import { InterFinanciamiento } from './internacionalizacion/inter_financiamiento.entity';
import { InterModalidad } from './internacionalizacion/inter_modalidad.entity';
import { InterNivel } from './internacionalizacion/inter_nivel.entity';
import { InterPais } from './internacionalizacion/inter_pais.entity';
import { InterSede } from './internacionalizacion/inter_sede.entity';
import { InterTipoParticipante } from './internacionalizacion/inter_tipo_participante.entity';
import { Titulacion } from './biblioteca/entities/biblioteca.entity';
import { RolUsuario } from './login/rol_usuario.entity';
import { RolRuta } from './login/rol_ruta.entity';
import { Ruta } from './login/ruta.entity';
import { ModalidadTitulacion } from './biblioteca/entities/modalidad_titulacion.entity';
import { Malla } from './titulacion/entities/tbl_malla.entity';
import { MatrizGraduados } from './administracion/entities/matriz_graduados.entity';
import { Usuario } from './login/usuario.entity';
import { Rol } from './administracion/entities/rol.entity';
import { TitulacionCarreraMalla } from './titulacion/entities/tbl_titulacion_carrera_malla.entity'; 
import { Titulacion_tbl } from './titulacion/entities/tbl_titulacion.entity';
import { TitulacionDetalle } from './titulacion/entities/titulacion_detalle.entity'; 
import { UsuarioCarreraPrivilegios } from './titulacion/entities/usuario_carrera_privilegios.entity';


// Gestion Archivo Entities
import { UnidadAcademicaAdmin } from './gestion_archivo/entities/unidad_academica_admin.entity';
import { SubUnidadAcademicaAdmin } from './gestion_archivo/entities/sub_unidad_academica_admin.entity';
import { CuadroGeneralClasificacion } from './gestion_archivo/entities/cuadro_general_clasificacion.entity';
import { DatoExpediente } from './gestion_archivo/entities/dato_expediente.entity';
import { EstructuraOrganizacional } from './gestion_archivo/entities/estructura_organizacional.entity';

//Vinculación
import { VinculacionConveniosCartas } from './vinculacion/entities/vinculacion_convenios_cartas.entity'; 
import { VinculacionEmpresas } from './vinculacion/entities/vinculacion_empresas.entity'; 
import { VinculacionEmpresaTipo } from './vinculacion/entities/vinculacion_empresa_tipo.entity';
import { VinculacionPracticaTipo } from './vinculacion/entities/vinculacion_practica_tipo.entity';
import { VinculacionCineCampoAmplio } from './vinculacion/entities/vinculacion_cine_campo_amplio.entity';
import { VinculacionCineCampoEspecifico } from './vinculacion/entities/vinculacion_cine_campo_especifico.entity';
import { VinculacionCineCampoDetallado } from './vinculacion/entities/vinculacion_cine_campo_detallado.entity';
import { VinculacionPractica } from './vinculacion/entities/vinculacion_practica.entity';
import { VinculacionModule } from './vinculacion/vinculacion.module';

//Aprehenser
import { AprehenserModule } from './aprehenser/aprehenser.module';
import { AprehenserPaginaWeb } from './aprehenser/entities/aprehenser_pagina_web.entity';
import { Convocatoria } from './aprehenser/entities/convocatoria.entity';  
import { Proyecto } from './aprehenser/entities/proyecto.entity';
import { NoticiasImagenes } from './aprehenser/entities/noticias_imagenes.entity';
import { AprehenserDesarrollo } from './aprehenser/entities/aprehenser_desarrollo.entity';
import { CursoRegistro } from './aprehenser/entities/curso_registro.entity';


//Estadisticas
import { EstadisticasModule } from './estadisticas/estadisticas.module';


//Repositorio
import { RepositorioModule } from './repositorio/repositorio.module'; 

//Dashboard
import { DashboardModule } from './dashboard/dashboard.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [
        Usuario, RolUsuario, RolRuta, Ruta,
        Internacionalizacion, InterAreaConocimiento, InterAreaconEspecifico, InterCarrera, InterFinanciamiento, InterModalidad, InterNivel, InterPais, InterSede, InterTipoParticipante,
        Carrera, Titulacion, ModalidadTitulacion, GlobalDominios, GlobalPersonal, GlobalEstudiantes, GlobalPeriodo, GlobalSede, Rol, Titulacion_tbl,  VinculacionPracticaTipo, VinculacionCineCampoAmplio,
        ExpedienteAcademico, ExpedienteTipoTramite, Malla, VinculacionConveniosCartas, VinculacionEmpresas, Acta, VinculacionEmpresaTipo, TitulacionCarreraMalla, UsuarioCarreraPrivilegios,
        UnidadAcademicaAdmin, SubUnidadAcademicaAdmin, CuadroGeneralClasificacion, DatoExpediente, EstructuraOrganizacional, ExpedienteAcademicoDetalle, TitulacionDetalle,
        VinculacionCineCampoEspecifico, VinculacionCineCampoDetallado, VinculacionPractica, AprehenserPaginaWeb, Convocatoria, Proyecto,  NoticiasImagenes, AprehenserDesarrollo, CursoRegistro,
      ],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([
      Usuario, RolUsuario, RolRuta, Ruta,
      Internacionalizacion, InterAreaConocimiento, InterAreaconEspecifico, InterCarrera, InterFinanciamiento, InterModalidad, InterNivel, InterPais, InterSede, InterTipoParticipante,
      Carrera, Titulacion, ModalidadTitulacion, GlobalDominios, GlobalPersonal, GlobalEstudiantes, GlobalSede, Rol, Titulacion_tbl,  VinculacionPracticaTipo, VinculacionCineCampoAmplio,
      ExpedienteAcademico, ExpedienteTipoTramite, MatrizGraduados, VinculacionConveniosCartas, VinculacionEmpresas, Acta, TitulacionCarreraMalla, UsuarioCarreraPrivilegios,
      UnidadAcademicaAdmin, SubUnidadAcademicaAdmin, CuadroGeneralClasificacion, DatoExpediente, EstructuraOrganizacional, ExpedienteAcademicoDetalle, TitulacionDetalle,
      VinculacionCineCampoEspecifico, VinculacionCineCampoDetallado, VinculacionPractica, AprehenserPaginaWeb, Convocatoria, Proyecto, NoticiasImagenes, AprehenserDesarrollo,
    ]),
    LoginModule,
    InternacionalizacionModule,
    BibliotecaModule,
    GlobalPersonalModule,
    GlobalEstudiantesModule,
    GlobalSedeModule,
    PeriodosModule,
    TitulacionModule,
    AlumniModule,
    ExpedienteModule,
    AdministracionModule,
    VinculacionModule,
    ActasModule,
    UsuarioCarreraPrivilegios,
    GestionArchivoModule, 
    TitulacionModule,
    AprehenserModule,
    EstadisticasModule,
    RepositorioModule,
    DashboardModule,
  ],
})
export class AppModule {}
