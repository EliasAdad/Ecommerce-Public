import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
// import { SignInDto } from "./auth.dto";
import { signInDto } from "./auth.dto";
import { UserDto } from "src/users/users.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";



@ApiTags("Auth")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }


    @Post('signup')
    async signUp(@Body() user: UserDto) {
        return this.authService.signUp(user);

    }

    @ApiBody({
        description: "Insert credentials to sign in ( email and password )",
        type: signInDto
    })
    @Post('signin')
    async signIn(@Body() data: signInDto) {
        const { email, password } = data;

        return await this.authService.signIn(email, password)

    }
}
