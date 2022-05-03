import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserResponseInterface } from "./interface/user.interface";
import { UserService } from "./user.service";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }
    @UsePipes(new ValidationPipe())
    @Post('users')
    async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.createUser(createUserDto)
        return this.userService.buildUserResponse(user);
    }
}