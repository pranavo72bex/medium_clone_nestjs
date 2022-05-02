import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Post('users')
    async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserEntity> {
        return await this.userService.createUser(createUserDto)
    }
}