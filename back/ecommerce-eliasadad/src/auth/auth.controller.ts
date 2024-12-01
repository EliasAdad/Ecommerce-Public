import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./auth.dto";



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Get()
    getAuth(): string {
        return this.authService.getAuth();
    }

    @Post('signin')
    @HttpCode(HttpStatus.ACCEPTED)
    async signIn(@Body() data: SignInDto) {
        const { email, password } = data;

        if (!email || !password) {
            return 'Email and password are required!'
        }

        const user = await this.authService.signIn(email, password)

        return {
            user
        }
    }
}
