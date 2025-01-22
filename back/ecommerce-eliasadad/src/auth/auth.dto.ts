import { PickType } from "@nestjs/swagger"
import { UserDto } from "src/users/users.dto"


export class signInDto extends PickType(UserDto, ["email", "password"]) { }
