import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDto } from "./users.dto";
import { validateUser } from "src/utils/validate";
import { AuthGuard } from "src/auth/auth.guard";
import { User } from "./users.entity";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService,
    ) { }

    @Get()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    getUsers(@Query('page') page: number, @Query('limit') limit: number) {
        return this.usersService.getAllUsers(page, limit);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    getUserById(@Param('id') id: string) {
        const user = this.usersService.getUserById(id);
        return user
    }

    @Post('createUser')
    @HttpCode(HttpStatus.CREATED)
    createUser(@Body() user: UserDto) {
        if (!validateUser(user)) {
            return 'Invalid user data, try again!'
        }
        return this.usersService.createUser(user)
    }

    @Put('update/:id')
    @UseGuards(AuthGuard)
    updateUser(@Param('id') id: string, @Body() data: User) {
        // if (!validateUser(data)) {
        //     return 'Invalid user data, try again!'
        // }
        return this.usersService.updateUser(id, data)
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id)

    }
}