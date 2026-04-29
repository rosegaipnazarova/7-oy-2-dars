import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class QueryDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  @ApiPropertyOptional({ default: 1, minimum: 1 })
  page?: number = 1;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  @ApiPropertyOptional({ default: 10, minimum: 1 })
  limit?: number = 10;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  search?: string;
}