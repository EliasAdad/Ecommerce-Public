import { BadRequestException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersRepository } from "src/users/users.repository";
import { SignInDto } from "./auth.dto";
import { UserDto } from "src/users/users.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'


@Injectable()
export class AuthService {
    constructor(private usersRepository: UsersRepository,
        private jwtService: JwtService) { }



    async signUp(user: UserDto) {
        const foundUser = await this.usersRepository.getByEmail(user.email);

        if (foundUser) throw new BadRequestException("Email already exists");

        if (user.password !== user.confirmPassword) throw new BadRequestException("Passwords don't match")

        const hashedPassword = await bcrypt.hash(user.password, 10)

        if (!hashedPassword) throw new BadRequestException("Password couldn't be hashed")

        const newUser = await this.usersRepository.createUser({ ...user, password: hashedPassword });

        const { password, confirmPassword, ...withoutPw } = newUser

        return withoutPw;
    }


    async signIn(email: string, password: string) {


        if (!email || !password) {
            return { message: 'Email or password are required', status: HttpStatus.UNAUTHORIZED }
        }

        const user = await this.usersRepository.getByEmail(email);
        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!user || !isValidPassword) throw new BadRequestException("User not found or invalid password, try again")

        const payload = {
            sub: user.id,
            id: user.id,
            email: user.email,
            isAdmin: user.isAdmin
        }

        const token = this.jwtService.sign(payload);

        return { message: "User signed in successfully", token }
    }
}