import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class LoginDto {

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({default: "rosegaipnazarova@gmail.com"})   
    email!:string;

    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    @ApiProperty({default: "rosie1111"})
    password!:string;
}
