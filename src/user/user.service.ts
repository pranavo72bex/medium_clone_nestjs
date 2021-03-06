import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from "./user.entity";
import { sign } from "jsonwebtoken";
import { UserResponseInterface } from "./interface/user.interface";
import { LoginUserDto } from "./dto/loginuser.dto";
import { compare } from "bcrypt"
@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    ) { }
    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const userByEmail = await this.userRepository.findOne({
            where: {
                email: createUserDto.email,
            }
        });
        const userByUser = await this.userRepository.findOne({
            where: {
                username: createUserDto.username,
            }
        })
        if (userByEmail || userByUser) {
            throw new HttpException('Email or username are taken', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);
        return await this.userRepository.save(newUser);
    }

    async findUserById(id: number): Promise<UserEntity> {
        return this.userRepository.findOne({ where: { id } });
    }

    buildUserResponse(user: UserEntity): UserResponseInterface {
        return {
            user: {
                ...user,
                token: this.generateJwt(user)
            }
        }
    }
    generateJwt(user: UserEntity): string {
        return sign({
            id: user.id,
            username: user.username,
            email: user.email,
        }, 'JWT_KEY')
    }

    async login(loginUsersDto: LoginUserDto): Promise<UserEntity> {

        const user = await this.userRepository.findOne({
            where: {
                email: loginUsersDto.email,
            }
        })
        if (!user) {
            throw new HttpException('Credentail not valid', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const isPasswordCorrect = await compare(loginUsersDto.password, user.password)
        if (!isPasswordCorrect) {
            throw new HttpException('Invalid password', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        return user;
    }
}