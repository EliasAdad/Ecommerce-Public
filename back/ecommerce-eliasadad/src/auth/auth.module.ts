import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
// import { UsersModule } from "src/users/users.module";
import { UsersRepository } from "src/users/users.repository";

@Module({
    imports: [],
    controllers: [AuthController],
    providers: [AuthService, UsersRepository],
})
export class AuthModule {

}