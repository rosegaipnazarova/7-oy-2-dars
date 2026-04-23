import { IsEmail, IsNotEmpty, IsString, Matches, matches, MaxLength, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsString()
    @MinLength(3,{message: "Kamida 3 ta harf bo'lsin"})
    @MaxLength(50)
    username!:string;

    @IsEmail()
    @IsNotEmpty()
    email!:string;

    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    password!:string;
}
