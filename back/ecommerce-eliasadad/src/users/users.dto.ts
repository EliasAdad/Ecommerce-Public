import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator"

export class UserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    name: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    // @MaxLength(60)
    @IsStrongPassword({
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    password: string

    @IsNotEmpty()
    confirmPassword: string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string

    @IsNotEmpty()
    @IsNumber()
    phone: number

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country?: string | undefined

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city?: string | undefined

    @IsEmpty()
    isAdmin?: boolean
}


