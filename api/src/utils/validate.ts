import { UserDto } from "src/users/users.dto";

export function validateUser(user: UserDto): boolean {
    const validUser = user.name !== undefined
        && user.email !== undefined
        && user.address !== undefined
        && user.password !== undefined
        && user.phone !== undefined

    return validUser;
}