import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./users.entity";
import { UserDto } from "./users.dto";

@Injectable()
export class UsersService {

    constructor(private usersRepository: UsersRepository) { }

    getAllUsers() {
        return this.usersRepository.getAllUsers();
    }

    getUserById(id: number) {
        return this.usersRepository.getUserById(id);
    }

    createUser(user: UserDto) {
        return this.usersRepository.createUser(user);
    }

    updateUser(id: number, data: UserDto) {
        return this.usersRepository.updateUser(id, data);
    }

    deleteUser(id: number) {
        return this.usersRepository.deleteUser(id)
    }
}