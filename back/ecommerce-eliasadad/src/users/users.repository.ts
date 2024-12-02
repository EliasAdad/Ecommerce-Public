import { Injectable } from "@nestjs/common";
import { User } from "./users.entity";
import { UserDto } from "./users.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) { }



    async getAllUsers(page: number = 1, limit: number = 5) {
        const users = await this.usersRepository.find({ relations: { orders: true } })

        if (!users.length) return "There are no users"

        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginated = users.slice(startIndex, endIndex).map(({ password, ...rest }) => {
            return rest
        })

        return paginated;
    }

    async getUserById(id: string) {
        const user = this.usersRepository.findOne({
            where: { id }, relations: {
                orders: true
            }
        })
        if (!user) return "User doesn't exist"

        return user
    }

    async getByEmail(email: string) {
        return this.usersRepository.findOne({ where: { email } })
    }

    async createUser(user: UserDto) {
        const newUser = await this.usersRepository.save(user)
        return newUser;
    }

    async updateUser(id: string, data: User) {
        const user = await this.usersRepository.findOneBy({ id })

        if (!user) return "User not found"

        await this.usersRepository.update(id, { ...data })
        return user
    }

    async deleteUser(id: string) {
        const deleted = await this.usersRepository.findOneBy({ id })

        await this.usersRepository.delete(id)
        return deleted.id
    }

} 