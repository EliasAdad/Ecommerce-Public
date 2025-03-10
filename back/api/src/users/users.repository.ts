import { Injectable } from "@nestjs/common";
import { User } from "./users.entity";
import { UserDto } from "./users.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./update-users.dto";

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
        const user = await this.usersRepository.findOne({
            where: { id }, relations: {
                orders: true
            }
        })
        if (!user) return "User doesn't exist"

        const { password, isAdmin, ...withoutPw } = user

        return withoutPw;
    }

    async getByEmail(email: string) {

        return await this.usersRepository.findOne({ where: { email } })

    }

    async createUser(user: UserDto) {
        return await this.usersRepository.save(user)
    }

    async updateUser(id: string, data: UpdateUserDto) {
        const user = await this.usersRepository.findOne({ where: { id } })

        if (!user) return "User not found"

        await this.usersRepository.update(id, data)

        const updated = await this.usersRepository.findOne({ where: { id } })

        const { password, isAdmin, ...withoutPw } = updated

        return withoutPw;
    }

    async deleteUser(id: string) {
        const deleted = await this.usersRepository.findOneBy({ id })

        await this.usersRepository.delete(id)
        return deleted.id
    }

} 