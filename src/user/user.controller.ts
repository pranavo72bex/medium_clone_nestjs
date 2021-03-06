import { Body, Controller, Get, Post, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserResponseInterface } from "./interface/user.interface";
import { UserService } from "./user.service";
import { Request } from 'express'

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }
    @UsePipes(new ValidationPipe())
    @Post('users')
    async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.createUser(createUserDto)
        return this.userService.buildUserResponse(user);
    }
    @Post('/users/login')
    async login(@Body('user') loginDto: any) {
        const user = await this.userService.login(loginDto);
        return this.userService.buildUserResponse(user)
    }
    @Get('user')
    async currentUser(@Req() request: Request): Promise<UserResponseInterface> {
        return 'current' as any;

    }

}