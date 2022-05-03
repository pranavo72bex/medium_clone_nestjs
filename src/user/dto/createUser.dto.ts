import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    readonly username: string;
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;
    @IsNotEmpty()
    readonly password: string;
}