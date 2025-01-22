import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator"

export class UserDto {

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        'description': "It must be a valid email",
        'example': "user@gmail.com"
    })
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    @ApiProperty({
        'description': "Must be at least 3 characters long",
        'example': "Nahuel"
    })
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
    @ApiProperty({
        "description": "It should be hard to guess :) (Must have at least 1 uppercase, 1 lowercase, 1 number and 1 symbol)",
        "example": "StrongPassword!($)2025"
    })
    password: string

    @IsNotEmpty()
    @ApiProperty({
        "description": "Insert the same password again",
        "example": "StrongPassword!($)2025"
    })
    confirmPassword: string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    @ApiProperty({
        "description": "It has to be at least 3 characters long",
        "example": "Av. Nazca 3000"
    })
    address: string

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        "description": "It has to be a valid phone number",
        "example": 1149584949
    })
    phone: number

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    @ApiProperty({
        "description": "It has to be a valid country.",
        "example": "Argentina"
    })
    country?: string | undefined

    @IsString()
    @MinLength(5)
    @MaxLength(30)
    @ApiProperty({
        "description": "It has to be a valid city",
        "example": "Ciudad de Buenos Aires"
    })
    city?: string | undefined

    @IsEmpty()
    @ApiProperty({
        "description": "It's defined by default. It has to be empty and It cannot be received in the request",
    })
    isAdmin?: boolean
}


