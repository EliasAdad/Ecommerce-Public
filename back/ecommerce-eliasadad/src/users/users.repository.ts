import { Injectable } from "@nestjs/common";
import { User } from "./users.entity";
import { UserDto } from "./users.dto";

@Injectable()
export class UsersRepository {

    private users = [
        // {
        //     id: 1,
        //     name: "Elias",
        //     password: "1234",
        //     email: "elias@mail.com",
        //     address: "street 104",
        //     phone: 1151209008,
        //     country: "Argentina",
        //     city: "CABA",
        //     orders: []
        // },
        // {
        //     id: 2,
        //     name: "Mario",
        //     password: "1234",
        //     email: "mario@gmail.com",
        //     address: "street 210",
        //     phone: 1169632877,
        //     country: "Argentina",
        //     city: "Caseros",
        //     orders: []
        // }
    ]

    async getAllUsers(page: number = 1, limit: number = 5) {
        if (!this.users.length) return "Users not found"

        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginated = this.users.slice(startIndex, endIndex).map(({ password, ...rest }) => {
            return rest
        })

        return paginated;
    }

    async getUserById(id: number): Promise<Omit<User, 'password'> | string> {
        const user = this.users.find((user) => user.id === id)
        if (!user) return "User doesn't exist"

        const { password, ...rest } = user
        return rest;
    }

    async getByEmail(email: string) {
        return this.users.find((user) => user.email === email)
    }

    async createUser(user: UserDto) {
        let id: number = this.users.length + 1;

        this.users = [...this.users, { id, ...user }]
        return { id };
    }

    async updateUser(id: number, data: UserDto) {

        const userIndex = this.users.findIndex((user) => user.id === id)

        if (userIndex === -1) return "User not found or doesn't exist"

        this.users[userIndex] = { ...this.users[userIndex], ...data }

        return { updated: this.users[userIndex].id }
    }

    async deleteUser(id: number) {
        const userIndex = this.users.findIndex((user) => user.id === id)
        if (userIndex === -1) return { error: "User doesn't exist" }

        const [deletedUser] = this.users.splice(userIndex, 1);

        return { deletedUser: deletedUser.id }

    }

}