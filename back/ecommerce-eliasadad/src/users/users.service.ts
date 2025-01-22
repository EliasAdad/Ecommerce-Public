import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { UserDto } from "./users.dto";
import { UpdateUserDto } from "./update-users.dto";

@Injectable()
export class UsersService {

    constructor(private usersRepository: UsersRepository) { }

    getAllUsers(page: number, limit: number) {
        return this.usersRepository.getAllUsers(page, limit);
    }

    getUserById(id: string) {
        return this.usersRepository.getUserById(id);
    }

    createUser(user: UserDto) {
        return this.usersRepository.createUser(user);
    }

    updateUser(id: string, data: UpdateUserDto) {
        return this.usersRepository.updateUser(id, data);
    }

    deleteUser(id: string) {
        return this.usersRepository.deleteUser(id)
    }
}