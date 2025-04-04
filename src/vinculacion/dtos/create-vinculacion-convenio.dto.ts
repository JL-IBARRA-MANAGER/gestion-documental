import { IsOptional, IsString, IsInt } from 'class-validator';

export class CreateVinculacionConvenioDto {
  @IsOptional()
  @IsString()
  VINE_ID?: string;

  @IsOptional()
  @IsString()
  VINCC_LINK?: string;

  @IsOptional()
  @IsString()
  VINCC_ESTADO?: string;
}
