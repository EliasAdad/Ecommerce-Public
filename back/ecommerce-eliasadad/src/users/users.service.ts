import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {

    constructor(private usersRepository: UsersRepository) { }

    getAllUsers() {
        return this.usersRepository.getAllUsers();
    }
}