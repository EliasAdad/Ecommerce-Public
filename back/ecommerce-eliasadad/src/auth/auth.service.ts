import { HttpStatus, Injectable } from "@nestjs/common";
import { UsersRepository } from "src/users/users.repository";
import { SignInDto } from "./auth.dto";


@Injectable()
export class AuthService {
    constructor(private usersRepository: UsersRepository) { }

    getAuth(): string {
        return 'Get auth'
    }

    async signIn(email: string, password: string) {


        if (!email || !password) {
            return { message: 'Email and password are required', status: HttpStatus.UNAUTHORIZED }
        }

        const user = await this.usersRepository.getByEmail(email);

        if (!user || user.password !== password) {
            return { message: 'Invalid email or password, try again!', status: HttpStatus.UNAUTHORIZED }
        }

        const { password: _, ...withoutPw } = user

        return withoutPw;

    }
}