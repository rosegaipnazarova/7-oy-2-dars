import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class VerifyDto{
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({default: "rosie@gmail.com"})   
    email!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({default: "rosie123"})   
    otp!: string;
}