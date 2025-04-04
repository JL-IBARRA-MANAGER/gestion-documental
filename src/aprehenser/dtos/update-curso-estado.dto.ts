// src/aprehenser/dtos/update-curso-estado.dto.ts
import { IsInt, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCursoEstadoDto {
  @ApiProperty({ description: 'ID del registro de participante', example: 1 })
  @IsInt()
  REC_ID: number;

  @ApiProperty({
    description: 'Estado del participante: Inscrito=1, Finalizado=2, Reprobado=3',
    example: 1,
  })
  @IsInt()
  @IsIn([1, 2, 3])
  REC_ESTADO: number;
}
