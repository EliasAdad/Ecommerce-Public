import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDto } from "./users.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService,
    ) { }

    @Get()
    @UseGuards(AuthGuard)
    getUsers(@Query('page') page: number, @Query('limit') limit: number) {
        return this.usersService.getAllUsers(page, limit);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    getUserById(@Param('id', ParseUUIDPipe) id: string) {
        const user = this.usersService.getUserById(id);
        return user
    }

    @Post('createUser')
    createUser(@Body() user: UserDto) {

        return this.usersService.createUser(user)
    }

    @Put('update/:id')
    @UseGuards(AuthGuard)
    updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() data: Partial<UserDto>) {

        return this.usersService.updateUser(id, data)
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.deleteUser(id)

    }
}