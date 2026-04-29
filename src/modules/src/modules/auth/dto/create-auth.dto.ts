import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, matches, MaxLength, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @MinLength(3,{message: "Kamida 3 ta harf bo'lsin"})
    @MaxLength(50)
    @ApiProperty({default: "rosie"})
    username!:string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({default: "rosegaipnazarova@gmail.com"})   
    email!:string;

    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    @ApiProperty({default: "rosie1111"})
    password!:string;
}
