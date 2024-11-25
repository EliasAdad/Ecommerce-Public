import { Injectable } from "@nestjs/common";
import { User } from "./users.entity";
import { UserDto } from "./users.dto";

@Injectable()
export class UsersRepository {

    private users: User[] = [
        {
            id: 1,
            name: "Elias",
            password: "1234",
            email: "elias@mail.com",
            address: "street 104",
            phone: "1151209008",
            country: "Argentina",
            city: "CABA"
        },
        {
            id: 2,
            name: "Mario",
            password: "1234",
            email: "mario@gmail.com",
            address: "street 210",
            phone: "1169632877",
            country: "Argentina",
            city: "Caseros"
        }
    ]

    async getAllUsers() {
        if (!this.users.length) return "Users not found"
        const users = this.users.map(({ id, name, email, address, phone, country, city }) => {
            return { id, name, email, address, phone, country, city }
        });
        return users;
    }

    async getUserById(id: number): Promise<Omit<User, 'password'> | string> {
        const user = this.users.find((user) => user.id === id)
        if (!user) return "User doesn't exist"

        const { name, email, address, phone, country, city } = user
        return { id, name, email, address, phone, country, city }
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