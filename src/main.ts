import { NestFactory } from '@nestjs/core';  
import { AppModule } from './app.module';  
import { Logger } from '@nestjs/common';  
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';  
import * as fs from 'fs';  

async function bootstrap() {  
  // Elimina la referencia a httpsOptions  
  const app = await NestFactory.create(AppModule, {  
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],  
    // Quita httpsOptions de aquí  
  });  

  const logger = new Logger('Bootstrap');  
  const port = 3000; // Puerto específico para este servicio  

  // Habilitación de CORS  
  app.enableCors({  
    origin: ['https://pucei.edu.ec:10001', 'https://pucei.edu.ec:10005'],   
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  
    allowedHeaders: ['Content-Type', 'Authorization', 'apikey', 'apisecret'],  
    credentials: true,  
  });  

  // Prefijo global de rutas  
  app.setGlobalPrefix('api');  

  // Configuración de Swagger  
  const config = new DocumentBuilder()  
    .setTitle('Sistema Documental')  
    .setDescription('Documentación de la API para produccion_documental')  
    .setVersion('1.0')  
    .addTag('Biblioteca')  
    .addTag('Internacionalizacion')  
    .addApiKey({ type: 'apiKey', name: 'apikey', in: 'header' }, 'apikey')  
    .addApiKey({ type: 'apiKey', name: 'apisecret', in: 'header' }, 'apisecret')  
    .build();  

  const document = SwaggerModule.createDocument(app, config);  
  SwaggerModule.setup('api', app, document);  

  // Escuchar en el puerto especificado  
  app  
    .listen(port, '0.0.0.0')  
    .then(() => logger.log(`App running on port ${port}`))  
    .catch((err) => logger.error(`No se inicializó la app: ${err}`));  
}  
bootstrap();  