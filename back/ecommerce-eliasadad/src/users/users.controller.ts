import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDto } from "./users.dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    getUsers() {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        const user = this.usersService.getUserById(id);
        return user
    }

    @Post('createUser')
    createUser(@Body() user: UserDto) {
        return this.usersService.createUser(user)
    }

    @Put('update/:id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() data: UserDto) {
        return this.usersService.updateUser(id, data)
    }

    @Delete('delete/:id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id)

    }
}