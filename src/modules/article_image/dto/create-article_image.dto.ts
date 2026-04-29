import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class CreateArticleImageDto {
  @IsInt()
  @ApiProperty({ default: 1 })
  articleId!: number;
}