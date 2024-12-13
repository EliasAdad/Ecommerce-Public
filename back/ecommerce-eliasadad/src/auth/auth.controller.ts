import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./auth.dto";
import { UserDto } from "src/users/users.dto";



@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }



    @Post('signup')
    async signUp(@Body() user: UserDto) {
        return this.authService.signUp(user);

    }

    @Post('signin')
    async signIn(@Body() data: SignInDto) {
        const { email, password } = data;

        return await this.authService.signIn(email, password)

    }
}
