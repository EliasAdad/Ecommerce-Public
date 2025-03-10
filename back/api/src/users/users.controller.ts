import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDto } from "./users.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorator/roles/roles.decorator";
import { Role } from "src/enum/role.enum";
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags, PartialType } from "@nestjs/swagger";
import { UpdateUserDto } from "./update-users.dto";

@ApiBearerAuth()
@ApiTags("Users")
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService,
    ) { }

    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    getUsers(@Query('page') page: number, @Query('limit') limit: number) {
        return this.usersService.getAllUsers(page, limit);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    getUserById(@Param('id', ParseUUIDPipe) id: string) {
        const user = this.usersService.getUserById(id);
        return user
    }

    @Put('update/:id')
    @UseGuards(AuthGuard)
    @ApiBody({
        description: "The information you want to update from the user",
        type: UserDto
    })
    @ApiParam({
        name: "id",
        description: "The ID of the user to update"
    })
    updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateUserDto) {

        return this.usersService.updateUser(id, data)
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.deleteUser(id)

    }
}