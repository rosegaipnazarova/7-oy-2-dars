import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt } from "class-validator";
import { CreateArticleImageDto } from "./create-article_image.dto";

export class CreateImageDto extends CreateArticleImageDto{
  @IsArray()
  @ApiProperty({ default: 1 })
  files: any
}