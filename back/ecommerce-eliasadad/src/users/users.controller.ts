import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDto } from "./users.dto";
import { validateUser } from "src/utils/validate";
import { AuthGuard } from "src/auth/auth.guard";

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
    getUserById(@Param('id', ParseIntPipe) id: number) {
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
    @HttpCode(HttpStatus.OK)
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() data: UserDto) {
        if (!validateUser(data)) {
            return 'Invalid user data, try again!'
        }
        return this.usersService.updateUser(id, data)
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id)

    }
}