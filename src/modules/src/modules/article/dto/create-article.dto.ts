import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsInt, IsString } from "class-validator";
import { Tag } from "src/modules/tag/entities/tag.entity";

export class CreateArticleDto {
    @IsString()
    @ApiProperty({default: "HTML"})
    title!: string;

    @IsString()
    @ApiProperty({default: "HTML is cool!"})   
    content!: string;

    @Transform(({value})=>{
     return   typeof value === "string" ? value.split(",").map((item)=> Number(item)): value
    })
    @IsArray()
    @IsInt({each: true})
    tags!: Tag[]
    
}
